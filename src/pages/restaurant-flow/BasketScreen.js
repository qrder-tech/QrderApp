import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Card, Collapse, Footer, BasketItem, OrderItem, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getOrder, postOrderNew } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

const DUMMY_ORDER = {
  "uuid": "01b95b8e-da8f-441b-af0c-835aea23f5d2",
  "total_items": 4,
  "total_price": 93,
  "items": [
    {
      "uuid": "527e7794-254a-4385-af20-90314dcfda91",
      "name": "SSK Dürüm",
      "desc": "Aspava Wrap",
      "img": "http://ataaspava.com/upload/resimler/3_SSK_DRM_DNER.png",
      "metadata": "sos;sogan;kasar",
      "price": 25,
      "quantity": 2
    },
    {
      "uuid": "527e7794-254a-4385-af20-90314dcfda91",
      "name": "SSK Dürüm",
      "desc": "Aspava Wrap",
      "metadata": "sos;kasar",
      "price": 25,
      "img": "http://ataaspava.com/upload/resimler/3_SSK_DRM_DNER.png",
      "quantity": 1
    },
    {
      "uuid": "527e7794-254a-4385-af20-90314dcfda93",
      "name": "Makarna",
      "desc": "Kremalı Tavuklu Makarna",
      "metadata": "tavuk;kremali sos;parmesan",
      "price": 18,
      "img": "https://iasbh.tmgrup.com.tr/dd93f3/812/467/0/135/3008/1864?u=http://i.tmgrup.com.tr/sfr/2013/09/10/Orjinal/638497744999.jpg",
      "quantity": 1
    }
  ],
  "isPaid": false,
  "restaurantUuid": "be09711a-c5b9-4bda-a464-76ca3d9ef848",
  "userUuid": "3d9b7b60-741f-45aa-b94a-68daa30b7ea6",
  "tableUuid": "af92bacf-a01a-4903-99d6-2887359c1d43",
  "createdAt": "2020-12-16T09:29:57.000Z",
  "updatedAt": "2020-12-16T09:29:57.000Z"
};

class BasketScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      basket: null,
      order: DUMMY_ORDER
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
        //this.setState({ order: { uuid: payload } });
        //this.setState({ order: DUMMY_ORDER });
        // this._getOrder();
      }).catch(err => {
        console.warn("err:", err);
      });
    });
  }

  componentDidMount() {
  }

  _getOrder = () => {
    const { order } = this.state;
    const { uuid } = order;

    if (!uuid) {
      return;
    }

    getOrder({ uuid }).then(payload => {
      this.setState({ order: payload });
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  _paymentDone = () => {
    const { paymentDone } = this.context;
    paymentDone();
  };

  _order = () => {
    const { saveOrder } = this.context;
    const { basket } = this.state;
    postOrderNew(basket).then(payload => {
      saveOrder(payload.uuid);
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
    const { basket, order } = this.state;
    return (
      <DefaultLayout type="restaurant">
        <ScrollView>
          {order.uuid && (
            <Collapse badge={order.total_items} style={{ marginBottom: 8 }} title="Ordered Items">
              {
                order.items && order.items.map(item => (
                  <OrderItem data={item} />
                ))
              }
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 18, marginBottom: 4 }}>
                <Title type="h5" style={{ fontSize: 16, color: theme.PRIMARY_COLOR }}>Total: {order.total_price} ₺</Title>
              </View>
            </Collapse>
          )}
          <View>
            {
              basket && basket.map(item => (
                <BasketItem key={item.uuid + item.metadata} data={item} deleteCallback={e => this._deleteItem(item)} />
              ))
            }
          </View>
        </ScrollView>
        <Footer>
          <Button
            onPress={() => this._paymentDone()}
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
