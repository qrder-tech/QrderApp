import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { PreviousOrderItem, RestaurantItem, SlideBox, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getOrderAll } from '#/lib/actions';

class OrderHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orders: null
    };

    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      this._getOrderAll();
    });
  }

  componentDidMount() {
    // this._getOrderAll();
  }

  _getOrderAll = () => {
    getOrderAll().then(payload => {
      this.setState({
        loading: false,
        orders: payload
      });
    }).catch(err => {
      console.warn(err);
    });
  }

  render() {
    const { loading, orders } = this.state;
    return (
      <DefaultLayout loading={loading} type="restaurant">
        <ScrollView>
          {orders && orders.map(order => (
            <PreviousOrderItem key={order.uuid} data={order} />
          ))}
        </ScrollView>
      </DefaultLayout >
    );
  }
}

const styles = StyleSheet.create({
  banners: {
    height: '40%',
    marginBottom: 8,
  },
  orderHistory: {
    flex: 2,
    paddingHorizontal: 16,
  },
  favorites: {
    flex: 1,
    paddingHorizontal: 16,
  }
});

export default OrderHistoryScreen;
