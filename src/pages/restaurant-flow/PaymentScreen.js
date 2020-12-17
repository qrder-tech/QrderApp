import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Input, Title } from '#/components';
import theme from '#/styles/theme.style';

import { RestaurantContext } from '#/lib/contexts';

const DUMMY_ORDER = {
  "uuid": "01b95b8e-da8f-441b-af0c-835aea23f5d2",
  "total_items": 5,
  "total_price": 106,
};

const DEBUG = true;

class PaymentScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      basket: null,
      order: DUMMY_ORDER,
      data: {
        name: DEBUG && "John Doe",
        number: DEBUG && "1111 1111 1111 1111",
        date: DEBUG && "12 / 20",
        ccv: DEBUG && "123"
      }
    };
  }

  componentDidMount() {
  }

  _pay = () => {
    const { paymentDone } = this.context;
    paymentDone();
  }

  render() {
    const { data, order } = this.state;
    return (
      <DefaultLayout type="restaurant">
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 18, marginBottom: 4, backgroundColor: theme.SECONDARY_COLOR }}>
          <Title type="h5" style={{ fontSize: 16, color: theme.PRIMARY_COLOR }}>Total: {order.total_price} ₺</Title>
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
