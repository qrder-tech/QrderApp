import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { PreviousOrderItem, RestaurantItem, SlideBox, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getUserMe, getUserOrders } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

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
}];

const DUMMY_FAVOURITES = [{
  name: "Coffee Take Away",
  rank: 8.7,
  img: "https://img.freepik.com/free-vector/coffee-shop-badge-vintage-style_1176-95.jpg?size=626&ext=jpg",
}, {
  name: "Bilkent Kebab",
  rank: 9.5,
  img: "https://media.istockphoto.com/vectors/doner-kebab-logo-templates-vector-id954909832?k=6&m=954909832&s=170667a&w=0&h=p6TolMJV5CRTBv0LmUWjiGjI0GnZcY1vR4VB5_7KY9M="
}, {
  name: "Waffle Station",
  rank: 7.2,
  img: "https://bpando.org//wp-content/uploads/Waffee-Logo-A-Friend-Of-Mine-on-BPO.jpg"
},];

class HomeScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = { loading: true, user: null, orders: DUMMY_ORDER, favourites: DUMMY_FAVOURITES };
  }

  componentDidMount() {
    this._getUser();
    // this._getUserOrders();
  }

  _getUser = () => {
    const { saveOrder, readQr } = this.context;

    getUserMe()
      .then((payload) => {
        this.setState({ loading: false, user: payload });
        const { navigation } = this.props;
        navigation.setOptions({ title: { uuid: payload.uuid, name: payload.name + " " + payload.surname } });

        if (payload.Orders) {
          const order = payload.Orders[0];
          if (order && order.uuid) {
            /*
            readQr({
              restaurantUuid: order.restaurantUuid,
              tableUuid: order.tableUuid
            });
            saveOrder(order.uuid);
            */
          }
        }
      })
      .catch((err) => {
        console.warn(err);
      });
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
        <View style={styles.banners}>
          <SlideBox />
        </View>
        <ScrollView>
          <View style={styles.orderHistory}>
            <Title type="h4" style={{ textAlign: 'left', borderBottomWidth: 1, borderColor: theme.SECONDARY_COLOR, marginBottom: 8 }}>Previous Orders</Title>
            {orders && orders.map(order => order.isPaid && (
              <PreviousOrderItem data={order} />
            ))}
          </View>
          <View style={styles.favorites}>
            <Title type="h4" style={{ textAlign: 'left', borderBottomWidth: 1, borderColor: theme.SECONDARY_COLOR, marginBottom: 8 }}>Favourites</Title>
            {favourites && favourites.map(restaurant => (
              <RestaurantItem data={restaurant} />
            ))}
          </View>
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

export default HomeScreen;
