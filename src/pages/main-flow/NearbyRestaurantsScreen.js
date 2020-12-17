import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { PreviousOrderItem, RestaurantItem, SlideBox, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getUserMe, getUserOrders } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

const DUMMY_RESTAURANTS = [{
  name: "Coffee Take Away",
  loc: {

  }
}, {
  name: "Bilkent Kebab",
  loc: {

  }
}, {
  name: "Waffle Station",
  loc: {

  }
}];

class NearbyRestaurantsScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = { loading: true, restaurants: DUMMY_RESTAURANTS };
  }

  componentDidMount() {
    // this._getUser();
    // this._getUserOrders();
    this.setState({ loading: false });
  }

  render() {
    const { loading, restaurants } = this.state;
    return (
      <DefaultLayout loading={loading} type="restaurant">

      </DefaultLayout >
    );
  }
}

const styles = StyleSheet.create({

});

export default NearbyRestaurantsScreen;
