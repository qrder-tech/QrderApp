import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

import { DefaultLayout } from '#/layouts';
import { PreviousOrderItem, RestaurantItem, SlideBox, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getUserMe, getOrderAll, getOffers, getFavourites } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

import AsyncStorage from '@react-native-community/async-storage';
import mq from '#/lib/clients/mqtt';

class HomeScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      favourites: null,
      loading: true,
      offers: null,
      orders: null,
      user: null,
    };
  }

  componentDidMount() {
    mq.client && mq.client.on('message', async (topic, message) => {
      if (topic === 'consumer/all') {
        this._getOffers();
      }
    });

    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      this._getUser();
      this._getOffers();
      this._getUserOrders();
      this._getFavourites();
    });
  }

  _getUser = () => {
    const { saveOrder, readQr } = this.context;

    getUserMe()
      .then(async (payload) => {
        this.setState({ loading: false, user: payload });
        const { navigation } = this.props;
        navigation.setOptions({ title: { uuid: payload.uuid, name: payload.name + " " + payload.surname } });

        try {
          await AsyncStorage.setItem('uuid', payload.uuid);
          mq.init();
        } catch (err) {
          console.warn(err);
        }

        if (payload.Orders) {
          const order = payload.Orders[0];
          if (order && order.uuid) {
            readQr({
              restaurantUuid: order.restaurantUuid,
              tableUuid: order.tableUuid,
            });

            saveOrder(order.uuid);
          }
        }
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  _getUserOrders = () => {
    getOrderAll('paid').then(payload => {
      this.setState({ orders: payload });
    }).catch(err => {
      console.warn(err);
    });
  }

  _getOffers = () => {
    getOffers().then(payload => {
      this.setState({ offers: payload });
    }).catch(err => {
      console.warn(err);
    });
  }

  _getFavourites = () => {
    getFavourites().then(payload => {
      this.setState({ favourites: payload });
    }).catch(err => {
      console.warn(err);
    });
  }

  render() {
    const { favourites, loading, offers, orders } = this.state;
    return (
      <DefaultLayout loading={loading} type="restaurant">
        <ScrollView>
          <View style={styles.banners}>
            {offers && (<SliderBox
              images={offers.map(offer => offer.img)}
              onCurrentImagePressed={
                index => console.warn(`image ${index} pressed`)
              }
              dotColor={theme.PRIMARY_COLOR}
              inactiveDotColor={theme.OUTLINE_COLOR}
              paginationBoxVerticalPadding={20}
              sliderBoxHeight={275}
              resizeMode='stretch'
              autoplay
              circleLoop
            />)}
          </View>
          <View style={styles.orderHistory}>
            <Title type="h4" style={{ textAlign: 'left', borderBottomWidth: 1, borderColor: theme.SECONDARY_COLOR, marginBottom: 8 }}>Previous Orders (Last 2)</Title>
            {orders && orders.slice(0, 2).map(order => (
              <PreviousOrderItem key={order.uuid} data={order} />
            ))}
          </View>
          <View style={styles.favorites}>
            <Title type="h4" style={{ textAlign: 'left', borderBottomWidth: 1, borderColor: theme.SECONDARY_COLOR, marginBottom: 8 }}>Favourites (Newest 2)</Title>
            {favourites && favourites.slice(0, 2).map(restaurant => (
              <RestaurantItem key={restaurant.uuid} data={restaurant} />
            ))}
          </View>
        </ScrollView>
      </DefaultLayout >
    );
  }
}

const styles = StyleSheet.create({
  banners: {
    marginBottom: 16,
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

export default HomeScreen;
