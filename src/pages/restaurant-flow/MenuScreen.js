import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { pickBy } from 'lodash';

import { DefaultLayout } from '#/layouts';
import { Card, Footer, Header, Input, MenuModifyItem, Title } from '#/components';
import theme from '#/styles/theme.style';

import { getRestaurantUuid } from '#/lib/actions';
import { RestaurantContext } from '#/lib/contexts';
import { getData } from '#/lib/utils';
import { MenuItem } from '#/components/index';

class MenuScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = { restaurant: null, basket: [], selectedItem: null };

    const { navigation } = this.props;

    navigation.addListener('focus', () => {
      const { getBasket } = this.context;
      getBasket().then(payload => {
        this.setState({ basket: payload || [] });
      }).catch(err => {
        console.warn("err:", err);
      });
    });
  }

  componentDidMount() {
    this._getRestaurantInfo();
  }

  _getRestaurantInfo = async () => {
    const qr = JSON.parse(await getData('qr'));

    getRestaurantUuid({ uuid: qr.restaurantUuid })
      .then((payload) => {
        this.setState({ restaurant: payload });
        const { navigation } = this.props;
        navigation.setOptions({ title: payload.name });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  _goTo = (page, args) => {
    const { navigation } = this.props;
    navigation.navigate(page, args);
  };

  _selectItem = (item) => {
    this.setState({ selectedItem: item });
  };

  _saveItem = async (data) => {
    const { selectedItem } = this.state;
    this.setState({ selectedItem: null });

    const options = await Object.keys(await pickBy(data.meta, v => v)).join(';');

    const item = {
      ...selectedItem,
      quantity: data.quantity,
      options
    };

    const { basket } = this.state;
    const temp = await basket.filter(e => e.uuid === item.uuid && e.options === item.options);
    temp.length > 0 ? (temp[0].quantity += item.quantity) : basket.push(item);

    this.setState({ basket });
    const { updateBasket } = this.context;
    updateBasket(basket);
  }

  render() {
    const { restaurant, selectedItem } = this.state;
    return (
      <DefaultLayout type="restaurant">
        {selectedItem && (<MenuModifyItem data={selectedItem} callback={this._saveItem} onPress={() => this.setState({ selectedItem: null })} />)}
        <ScrollView>
          <View>
            {
              (restaurant && restaurant.Menu) && restaurant.Menu.catalog.map(subtopic => (
                <>
                  <Card key={subtopic} style={styles.subtopicCard} radiusSide="none">
                    <Title style={styles.subtopicTitle} type="h5">{subtopic}</Title>
                  </Card>
                  {
                    restaurant.Menu.items[subtopic].map(item => (
                      <MenuItem key={item.uuid} data={item} onPress={() => this._selectItem(item)} />
                    ))
                  }
                </>
              ))
            }
          </View>
        </ScrollView>
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  subtopicCard: {
    flex: 0,
    marginBottom: 8,
    backgroundColor: theme.PRIMARY_BUTTON_COLOR
  },
  subtopicTitle: {
    color: theme.PRIMARY_COLOR,
  },
  menuItem: {

  }
});

export default MenuScreen;
