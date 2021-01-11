import React from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, View, KeyboardAvoidingView } from 'react-native';

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
      consumer: null,
      loading: true,
      paymentData: {
        amount: 25,
        creditCard: DUMMY_CARD,
      }
    };

    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      this._getConsumer();
    });
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  _onChange = (text, name) => {
    if (name === 'amount' && text < 0) {
      return;
    }

    const { paymentData } = this.state;
    this.setState({
      paymentData: {
        ...paymentData,
        [name]: text
      }
    });
  };

  _getConsumer = () => {
    getUserMe().then((payload) => {
      this.setState({
        loading: false,
        consumer: payload
      });
    }).catch(err => {
      Alert.alert(
        "User Details Failed",
        err && err.msg || "Unknown error. Please try later!",
        [
          { text: "OK" }
        ],
        { cancelable: true }
      );
    });
  }

  _addBalance = () => {
    this.setState({ loading: true });
    const { paymentData } = this.state;

    addBalance(paymentData).then((payload) => {
      this.setState({
        loading: false,
      });

      this._getConsumer();
    }).catch(err => {
      Alert.alert(
        "Wallet Payment Failed",
        err && err.msg || "Unknown error. Please try later!",
        [
          { text: "OK" }
        ],
        { cancelable: true }
      );
    });
  }

  render() {
    const { consumer, loading, paymentData } = this.state;

    return (
      <DefaultLayout loading={loading} type="restaurant">
        <View style={styles.headerWrapper}>
          <Title type="h4">Balance: {consumer ? consumer.balance : 0} ₺</Title>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="height"
        >
          <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.body}>
              <Input
                iconName="lira-sign"
                name="amount"
                onChangeText={(text) => this._onChange(text, "amount")}
                placeholder="Amount"
                style={styles.input}
                value={paymentData && paymentData.amount.toString()}
              />

              <Input
                iconName="user-alt"
                name="name"
                onChangeText={(text) => this._onChange(text, "name")}
                placeholder="Name on Card"
                style={styles.input}
                value={paymentData && paymentData.creditCard.name}
              />

              <Input
                iconName="credit-card"
                name="number"
                onChangeText={(text) => this._onChange(text, "number")}
                placeholder="Card Number"
                style={styles.input}
                value={paymentData && paymentData.creditCard.number}
              />

              <Input
                iconName="calendar-alt"
                name="date"
                onChangeText={(text) => this._onChange(text, "date")}
                placeholder="Expiration Date"
                style={styles.input}
                value={paymentData && paymentData.creditCard.date}
              />

              <Input
                iconName="unlock-alt"
                name="ccv"
                placeholder="CCV"
                style={styles.input}
                value={paymentData && paymentData.creditCard.ccv}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
