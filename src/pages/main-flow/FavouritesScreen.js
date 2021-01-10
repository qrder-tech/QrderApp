import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { PreviousOrderItem, RestaurantItem, SlideBox, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getFavourites, removeFromFavourites } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

class FavouritesScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      favourites: null
    };

    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      this._getFavourites();
    });
  }

  componentDidMount() {
    // this._getUser();
    // this._getUserOrders();
  }

  _getFavourites = () => {
    getFavourites().then(payload => {
      this.setState({
        loading: false,
        favourites: payload
      });
    }).catch(err => {
      console.warn(err);
    });
  }

  _removeFromFavourites = (restaurantUuid) => {
    removeFromFavourites({ restaurantUuid }).then(payload => {
      this._getFavourites();
    }).catch(err => {
      console.warn(err);
    });
  }

  render() {
    const { loading, favourites } = this.state;
    return (
      <DefaultLayout loading={loading} type="restaurant">
        <ScrollView>
          {favourites && favourites.map(restaurant => (
            <RestaurantItem key={restaurant.uuid} data={restaurant} deleteCallback={() => this._removeFromFavourites(restaurant.uuid)} />
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

export default FavouritesScreen;
