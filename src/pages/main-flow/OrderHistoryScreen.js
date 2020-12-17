import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { PreviousOrderItem, RestaurantItem, SlideBox, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getUserOrders } from '#/lib/actions';

const DUMMY_ORDER = [{
  "uuid": "01b95b8e-da8f-441b-af0c-835aea23f5d2",
  "total_items": 5,
  "total_price": 106,
  "items": [],
  "isPaid": true,
  "restaurantUuid": "be09711a-c5b9-4bda-a464-76ca3d9ef848",
  "restaurant": {
    name: "Bilkent Kebab",
    rank: 9.5,
  },
  "userUuid": "3d9b7b60-741f-45aa-b94a-68daa30b7ea6",
  "tableUuid": "af92bacf-a01a-4903-99d6-2887359c1d43",
  "createdAt": "2020-12-15T09:29:57.000Z",
  "updatedAt": "2020-12-15T09:29:57.000Z"
}, {
  "uuid": "01b95b8e-da8f-441b-af0c-835aea23f5d2",
  "total_items": 5,
  "total_price": 106,
  "items": [],
  "isPaid": true,
  "restaurantUuid": "be09711a-c5b9-4bda-a464-76ca3d9ef848",
  "restaurant": {
    name: "Coffee Take Away",
    rank: 8.7
  },
  "userUuid": "3d9b7b60-741f-45aa-b94a-68daa30b7ea6",
  "tableUuid": "af92bacf-a01a-4903-99d6-2887359c1d43",
  "createdAt": "2020-12-11T09:29:57.000Z",
  "updatedAt": "2020-12-11T09:29:57.000Z"
}, {
  "uuid": "01b95b8e-da8f-441b-af0c-835aea23f5d2",
  "total_items": 5,
  "total_price": 106,
  "items": [],
  "isPaid": true,
  "restaurantUuid": "be09711a-c5b9-4bda-a464-76ca3d9ef848",
  "restaurant": {
    name: "Coffee Take Away",
    rank: 8.7
  },
  "userUuid": "3d9b7b60-741f-45aa-b94a-68daa30b7ea6",
  "tableUuid": "af92bacf-a01a-4903-99d6-2887359c1d43",
  "createdAt": "2020-12-10T09:29:57.000Z",
  "updatedAt": "2020-12-10T09:29:57.000Z"
}];

class OrderHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, orders: DUMMY_ORDER };
  }

  componentDidMount() {
    // this._getUserOrders();
    this.setState({ loading: false });
  }

  _getUserOrders = () => {
    getUserOrders().then(payload => {
      this.setState({ orders: payload.orders });
    }).catch(err => {
      console.warn(err);
    });
  }

  render() {
    const { loading, orders, favourites } = this.state;
    return (
      <DefaultLayout loading={loading} type="restaurant">
        <ScrollView>
          {orders && orders.map(order => order.isPaid && (
            <PreviousOrderItem data={order} />
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
