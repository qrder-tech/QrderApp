import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Footer, Input, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getUserMe, addBalance } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

const DUMMY_CARD = {
  name: "John Doe",
  number: "1111 1111 1111 1111",
  date: "12 / 20",
  ccv: "123"
};

class WalletScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      amount: 25,
      consumer: null,
      creditCard: DUMMY_CARD,
      loading: true,
    };

    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      this._getConsumer();
    });
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  _getConsumer = () => {
    getUserMe().then((payload) => {
      this.setState({
        loading: false,
        consumer: payload
      });
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  _addBalance = () => {
    this.setState({ loading: true });
    const { amount } = this.state;

    addBalance({ amount }).then((payload) => {
      this.setState({
        loading: false,
      });

      this._getConsumer();
    }).catch(err => {
      console.warn("err:", err);
    });
  }

  render() {
    const { amount, consumer, loading, creditCard } = this.state;
    return (
      <DefaultLayout loading={loading} type="restaurant">
        <View style={styles.headerWrapper}>
          <Title type="h4">Balance: {consumer ? consumer.balance : 0} ₺</Title>
        </View>

        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
          <View style={styles.body}>
            <Input
              iconName="lira-sign"
              name="amount"
              placeholder="Amount"
              style={styles.input}
              value={amount.toString()}
            />

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
        </ScrollView>

        <Footer>
          <Button
            onPress={() => this._addBalance()}
            title="Add Balance"
          />
        </Footer>
      </DefaultLayout >
    );
  }
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 18,
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
});

export default WalletScreen;
