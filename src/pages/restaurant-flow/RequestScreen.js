import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Collapse, Footer, BasketItem, OrderItem, Title } from '#/components';
import theme from '#/styles/theme.style';

import mq from '#/lib/clients/mqtt';
import { getOrder } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

class RequestScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      order: null,
      savedOrder: null,
    };

    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      const { getSavedOrder } = this.context;

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
      this.setState({
        loading: false,
        order: payload
      });
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  _requestAccount = () => {
    const { order } = this.state;

    if (!order) {
      return;
    }

    mq.client.publish(`restaurant/${order.restaurantUuid}/${order.tableUuid}`, "service:payment");

    Alert.alert(
      "We have received your request!",
      "As soon as possible, your account will be delivered physically.",
      [
        { text: "OK" }
      ],
      { cancelable: true }
    );
  }

  _onlinePayment = () => {
    const { navigation } = this.props;
    navigation.navigate("Payment");
  };

  _callWaiter = () => {
    const { order } = this.state;

    if (!order) {
      return;
    }

    mq.client.publish(`restaurant/${order.restaurantUuid}/${order.tableUuid}`, "service:waiter");

    Alert.alert(
      "We have received your request!",
      "As soon as possible, one of the our helpful friends will take care of you.",
      [
        { text: "OK" }
      ],
      { cancelable: true }
    );
  }

  render() {
    const { loading, order } = this.state;
    return (
      <DefaultLayout type="restaurant" loading={loading}>
        <ScrollView>
          <View>
            {
              (order && order.Items) && order.Items.map(item => (
                <OrderItem key={item.uuid + "_" + item.OrderItems.options} data={item} />
              ))
            }
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 18, marginBottom: 4, backgroundColor: theme.SECONDARY_COLOR }}>
              <Title type="h5" style={{ fontSize: 16, color: theme.PRIMARY_COLOR }}>Total Price: {order ? order.totalPrice : 0} ₺</Title>
            </View>
          </View>
        </ScrollView>
        <Footer style={{ justifyContent: 'space-between', paddingHorizontal: 16 }}>
          {
            order && order.Restaurant.serviceType !== 'self' && (
              <Button
                onPress={() => this._requestAccount()}
                style={styles.button}
                title="Request Payment"
                size="small"
                type="secondary"
              />
            )
          }

          <Button
            onPress={() => this._onlinePayment()}
            style={styles.button}
            title="Online Payment"
          />

          {
            order && order.Restaurant.serviceType !== 'self' && (
              <Button
                onPress={() => this._callWaiter()}
                style={styles.button}
                title="Waiter / Waitress"
                type="secondary"
              />
            )
          }
        </Footer>
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 8,
  }
});

export default RequestScreen;
