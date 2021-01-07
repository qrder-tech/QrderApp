import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Card, Collapse, Footer, BasketItem, OrderItem, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getOrder, postOrder } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

class BasketScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      basket: null,
      order: {
        uuid: null
      },
      savedOrder: null,
      loading: false,
    };
    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      const { getBasket, getSavedOrder } = this.context;

      getBasket().then(payload => {
        this.setState({ basket: payload });
      }).catch(err => {
        console.warn("err:", err);
      });

      getSavedOrder().then(payload => {
        this.setState({ savedOrder: payload });
        this._getOrder();
      }).catch(err => {
        console.warn("err:", err);
      });
    });
  }

  componentDidMount() {
  }

  _getOrder = () => {
    const { savedOrder } = this.state;

    if (!savedOrder) {
      return;
    }

    getOrder({ uuid: savedOrder }).then(payload => {
      this.setState({ order: payload });
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  _order = () => {
    this.setState({ loading: true });
    const { basket, order } = this.state;
    postOrder(basket, order.uuid).then(payload => {
      const { saveOrder } = this.context;
      this.setState({ savedOrder: payload.uuid });
      saveOrder(payload.uuid);
      this._getOrder();
      this.setState({ basket: null, loading: false });
      const { emptyBasket } = this.context;
      emptyBasket();
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  _deleteItem = (item) => {
    const { basket } = this.state;

    const temp = basket.filter(e => e != item);
    this.setState({ basket: temp });

    const { updateBasket } = this.context;
    updateBasket(temp);
  }

  render() {
    const { basket, order, loading } = this.state;
    return (
      <DefaultLayout type="restaurant" loading={loading}>
        <ScrollView>
          {order.uuid && (
            <Collapse badge={order.Items ? order.Items.length : 0} style={{ marginBottom: 8 }} title="Ordered Items">
              {
                order.Items && order.Items.map(item => (
                  <OrderItem data={item} />
                ))
              }
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 18, marginBottom: 4 }}>
                <Title type="h5" style={{ fontSize: 16, color: theme.PRIMARY_COLOR }}>Total: {order.totalPrice} ₺</Title>
              </View>
            </Collapse>
          )}
          <View>
            {
              basket && basket.map(item => (
                <BasketItem key={item.uuid + item.options} data={item} deleteCallback={e => this._deleteItem(item)} />
              ))
            }
          </View>
        </ScrollView>
        <Footer>
          <Button
            onPress={() => this._order()}
            style={styles.button}
            color={theme.PRIMARY_BUTTON_COLOR}
            title="Order"
          />
        </Footer>
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    paddingHorizontal: 48,
    paddingVertical: 16,
  },
  inputWrapper: {
    flex: 1,
    width: '100%',
    // height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#959896'
  },
  input: {
    marginBottom: 8,
  },
  buttonWrapper: {
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#858886',
  },
  forget: {
    color: theme.PRIMARY_BUTTON_COLOR,
    textAlign: 'right',
  },
});

export default BasketScreen;
