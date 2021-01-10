import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Card, Collapse, Footer, BasketItem, OrderItem, Title } from '#/components';
import theme from '#/styles/theme.style';

import mq from '#/lib/clients/mqtt';
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

  _subscribeToOrderTopic = ({ uuid, restaurantUuid }) => {
    mq.client.subscribe(`restaurant/${restaurantUuid}/${uuid}`, (err) => {
      if (err) {
        console.log('[error]:', err);
        return;
      }
    });
  }

  _getOrder = () => {
    const { savedOrder } = this.state;

    if (!savedOrder) {
      return;
    }

    getOrder({ uuid: savedOrder }).then(payload => {
      if (payload && payload.status !== 'paid') {
        this.setState({ order: payload });
      } else {
        this.setState({ savedOrder: null });
        const { deleteSavedOrder } = this.context;
        deleteSavedOrder();
      }
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  _order = () => {
    const { basket, order } = this.state;

    if (!basket || basket.length === 0) {
      return;
    }

    this.setState({ loading: false });

    postOrder(basket, order.uuid).then(payload => {
      const { saveOrder, emptyBasket } = this.context;
      saveOrder(payload.uuid);
      this.setState({ savedOrder: payload.uuid, basket: null, loading: false });
      this._getOrder();
      emptyBasket();
      mq.client.publish(`restaurant/${payload.restaurantUuid}`, "order");
      this._subscribeToOrderTopic(payload);
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

  _leaveRestaurant = () => {
    const { basket, savedOrder } = this.state;

    if (savedOrder || (basket && basket.length > 0)) {
      return;
    }

    const { leaveRestaurant } = this.context;
    leaveRestaurant();
  }

  render() {
    const { basket, order, loading, savedOrder } = this.state;
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
                <Title type="h5" style={{ fontSize: 16, color: theme.PRIMARY_COLOR }}>Total Price: {order.totalPrice} ₺</Title>
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
          {
            (savedOrder || (basket && basket.length > 0)) ? (
              (basket && basket.length > 0) && (
                <Button
                  onPress={() => this._order()}
                  style={styles.button}
                  color={theme.PRIMARY_BUTTON_COLOR}
                  title="Order"
                />
              )
            ) : (
                <Button
                  onPress={() => this._leaveRestaurant()}
                  style={styles.button}
                  color={theme.PRIMARY_BUTTON_COLOR}
                  title="Leave Restaurant"
                />
              )
          }

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
