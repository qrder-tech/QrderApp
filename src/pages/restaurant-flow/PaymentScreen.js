import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Input, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getOrder, postOrderPay } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

const DEBUG = true;

class PaymentScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      order: null,
      savedOrder: null,
      data: {
        name: DEBUG && "John Doe",
        number: DEBUG && "1111 1111 1111 1111",
        date: DEBUG && "12 / 20",
        ccv: DEBUG && "123"
      }
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
      this.setState({ order: payload });
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  _pay = () => {
    const { order } = this.state;

    if (!order) {
      return;
    }

    const { uuid } = order;

    postOrderPay(uuid, { token: 'dummy-token' }).then(payload => {
      const { paymentDone } = this.context;
      paymentDone();
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  render() {
    const { data, order } = this.state;
    return (
      <DefaultLayout type="restaurant">
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 18, marginBottom: 4, backgroundColor: theme.SECONDARY_COLOR }}>
          <Title type="h5" style={{ fontSize: 16, color: theme.PRIMARY_COLOR }}>Total: {order ? order.totalPrice : 0} ₺</Title>
        </View>

        <ScrollView>
          <View style={styles.inputWrapper}>
            <Input
              iconName="user-alt"
              name="name"
              placeholder="Name on Card"
              style={styles.input}
              value={data.name}
            />

            <Input
              iconName="credit-card"
              name="number"
              placeholder="Card Number"
              style={styles.input}
              value={data.number}
            />

            <Input
              iconName="calendar-alt"
              name="date"
              placeholder="Expiration Date"
              style={styles.input}
              value={data.date}
            />

            <Input
              iconName="unlock-alt"
              name="ccv"
              placeholder="CCV"
              style={styles.input}
              value={data.ccv}
            />
          </View>
        </ScrollView>
        <Footer>
          <Button
            onPress={() => this._pay()}
            title="Pay"
          />
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
  inputWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '15%',
    // backgroundColor: '#959896'
  },
  input: {
    marginTop: 48,
    // backgroundColor: 'rgba(70, 70, 70, 0.2)'
  },
});

export default PaymentScreen;
