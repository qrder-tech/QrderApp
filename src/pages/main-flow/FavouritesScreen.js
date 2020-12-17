import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { PreviousOrderItem, RestaurantItem, SlideBox, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getUserMe, getUserOrders } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';

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

class FavouritesScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = { loading: true, favourites: DUMMY_FAVOURITES };
  }

  componentDidMount() {
    // this._getUser();
    // this._getUserOrders();
    this.setState({ loading: false });
  }

  render() {
    const { loading, orders, favourites } = this.state;
    return (
      <DefaultLayout loading={loading} type="restaurant">
        <ScrollView>
          <Title type="h4" style={{ textAlign: 'left', borderBottomWidth: 1, borderColor: theme.SECONDARY_COLOR, marginBottom: 8 }}>Favourites</Title>
          {favourites && favourites.map(restaurant => (
            <RestaurantItem data={restaurant} />
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
