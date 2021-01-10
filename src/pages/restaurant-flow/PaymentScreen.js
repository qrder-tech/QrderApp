import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Input, Title } from '#/components';
import theme from '#/styles/theme.style';

import mq from '#/lib/clients/mqtt';
import { getUserMe, getOrder, postOrderPay } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

const DUMMY_CARD = {
  name: "John Doe",
  number: "1111 1111 1111 1111",
  date: "12 / 20",
  ccv: "123"
};

class PaymentScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      creditCard: DUMMY_CARD,
      loading: false,
      order: null,
      savedOrder: null,
      paymentType: 0,
    };

    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      this._getConsumer();

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

  _getConsumer = () => {
    getUserMe().then((payload) => {
      this.setState({ loading: false, consumer: payload });
    }).catch(err => {
      console.warn("err:", err);
    });
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

  _pay = () => {
    const { consumer, order, paymentType } = this.state;

    if (!paymentType && (consumer.balance - order.totalPrice) < 0) {
      Alert.alert(
        "Payment Failed",
        "Insufficient Balance",
        [
          { text: "OK" }
        ],
        { cancelable: true }
      );

      return;
    }

    this.setState({ loading: true });

    if (!order) {
      return;
    }

    const { uuid, restaurantUuid } = order;

    postOrderPay(uuid, paymentType && { token: 'dummy-token' }).then(payload => {
      const { paymentDone } = this.context;
      paymentDone();
      mq.client.publish(`restaurant/${restaurantUuid}`, "order");
      this.setState({ loading: false });
    }).catch(err => {
      console.warn("err:", err);
      this.setState({ loading: false });

      Alert.alert(
        "Payment Failed",
        err && err.msg || "Unknown error. Please try later!",
        [
          { text: "OK" }
        ],
        { cancelable: true }
      );
    });
  }

  render() {
    const { consumer, creditCard, order, loading, paymentType } = this.state;
    return (
      <DefaultLayout type="restaurant" loading={loading}>
        <View style={styles.headerWrapper}>
          <Title type="h4">Total Price: {order ? order.totalPrice : 0} ₺</Title>
        </View>

        <View style={[styles.switchWrapper, theme.SHADOW]}>
          <Title type="h6" style={!paymentType ? { color: theme.PRIMARY_COLOR } : { color: theme.OUTLINE_COLOR }}>Wallet</Title>
          <Switch
            style={styles.switchInput}
            trackColor={{ false: theme.PRIMARY_BUTTON_COLOR, true: theme.PRIMARY_BUTTON_COLOR }}
            thumbColor={theme.SECONDARY_BUTTON_COLOR}
            onValueChange={() => this.setState({ paymentType: !paymentType })}
            value={paymentType}
          />
          <Title type="h6" style={paymentType ? { color: theme.PRIMARY_COLOR } : { color: theme.OUTLINE_COLOR }}>Credit Card</Title>
        </View>

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          {
            !paymentType ? (
              (consumer && order) && (
                <View style={styles.body}>
                  <View style={styles.walletRow}>
                    <Text style={styles.walletTitle}>Current Balance:</Text>
                    <Text style={styles.walletAmount}>{consumer.balance} ₺</Text>
                  </View>
                  <View style={styles.walletRow}>
                    <Text style={styles.walletTitle}></Text>
                    <Text style={[styles.walletAmount, { color: 'tomato' }]}>-{order.totalPrice} ₺</Text>
                  </View>
                  <View style={styles.walletRow}>
                    <Text style={styles.walletTitle}>New Balance:</Text>
                    <Text style={[styles.walletAmount, { color: ((consumer.balance - order.totalPrice) >= 0) ? 'green' : 'tomato' }]}>{consumer.balance - order.totalPrice} ₺</Text>
                  </View>
                </View>
              )
            ) : (
                <View style={styles.body}>
                  <Input
                    iconName="user-alt"
                    name="name"
                    placeholder="Name on Card"
                    style={styles.input}
                    value={creditCard && creditCard.name}
                  />

                  <Input
                    iconName="credit-card"
                    name="number"
                    placeholder="Card Number"
                    style={styles.input}
                    value={creditCard && creditCard.number}
                  />

                  <Input
                    iconName="calendar-alt"
                    name="date"
                    placeholder="Expiration Date"
                    style={styles.input}
                    value={creditCard && creditCard.date}
                  />

                  <Input
                    iconName="unlock-alt"
                    name="ccv"
                    placeholder="CCV"
                    style={styles.input}
                    value={creditCard && creditCard.ccv}
                  />
                </View>
              )
          }
        </ScrollView>

        <Footer>
          {(consumer && order) && (
            <Button
              onPress={() => this._pay()}
              title="Pay"
            />
          )}
        </Footer>
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 18,
    backgroundColor: theme.SECONDARY_COLOR,
  },
  body: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '10%',
    // backgroundColor: '#959896'
  },
  input: {
    marginVertical: 24,
    // backgroundColor: 'rgba(70, 70, 70, 0.2)'
  },
  switchWrapper: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  switchInput: {
    marginHorizontal: 8,
  },
  walletRow: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 8,
  },
  walletTitle: {
    flex: 1,
    fontSize: 20,
  },
  walletAmount: {
    flex: 1,
    textAlign: 'right',
    fontSize: 20,
  },
});

export default PaymentScreen;
