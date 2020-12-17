import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DefaultLayout } from '#/layouts';
import { Button, Collapse, Footer, BasketItem, OrderItem, Title } from '#/components';
import theme from '#/styles/theme.style';

import { RestaurantContext } from '#/lib/contexts';

const DUMMY_ORDER = {
  "uuid": "01b95b8e-da8f-441b-af0c-835aea23f5d2",
  "total_items": 5,
  "total_price": 106,
  "items": [
    {
      "uuid": "527e7794-254a-4385-af20-90314dcfda91",
      "name": "SSK Dürüm",
      "desc": "Aspava Wrap",
      "img": "http://ataaspava.com/upload/resimler/3_SSK_DRM_DNER.png",
      "metadata": "sos;sogan;kasar",
      "price": 25,
      "quantity": 2
    },
    {
      "uuid": "527e7794-254a-4385-af20-90314dcfda91",
      "name": "SSK Dürüm",
      "desc": "Aspava Wrap",
      "metadata": "sos;kasar",
      "price": 25,
      "img": "http://ataaspava.com/upload/resimler/3_SSK_DRM_DNER.png",
      "quantity": 1
    },
    {
      "uuid": "527e7794-254a-4385-af20-90314dcfda93",
      "name": "Makarna",
      "desc": "Kremalı Tavuklu Makarna",
      "metadata": "tavuk;kremali sos;parmesan",
      "price": 18,
      "img": "https://iasbh.tmgrup.com.tr/dd93f3/812/467/0/135/3008/1864?u=http://i.tmgrup.com.tr/sfr/2013/09/10/Orjinal/638497744999.jpg",
      "quantity": 1
    },
    {
      "uuid": "527e7794-254a-4385-af20-90314dcfda94",
      "name": "Tiramisu",
      "desc": "Sütlü Mütlü",
      "metadata": "",
      "price": 13,
      "img": "https://im.haberturk.com/2020/10/27/ver1603803092/2849865_810x458.jpg",
      "quantity": 1
    }
  ],
  "isPaid": false,
  "restaurantUuid": "be09711a-c5b9-4bda-a464-76ca3d9ef848",
  "userUuid": "3d9b7b60-741f-45aa-b94a-68daa30b7ea6",
  "tableUuid": "af92bacf-a01a-4903-99d6-2887359c1d43",
  "createdAt": "2020-12-16T09:29:57.000Z",
  "updatedAt": "2020-12-16T09:29:57.000Z"
};

class RequestScreen extends React.Component {
  static contextType = RestaurantContext;

  constructor(props) {
    super(props);
    this.state = {
      basket: null,
      order: DUMMY_ORDER,
    };
  }

  componentDidMount() {
  }

  _requestAccount = () => {
    Alert.alert(
      "We have received your request!",
      "As soon as possible, your account will be delivered physically.",
      [
        { text: "OK" }
      ],
      { cancelable: true }
    );
  }

  _onlinePayment = () => {
    const { navigation } = this.props;
    navigation.navigate("Payment");
  };

  _callWaiter = () => {
    Alert.alert(
      "We have received your request!",
      "As soon as possible, one of the our helpful friends will take care of you.",
      [
        { text: "OK" }
      ],
      { cancelable: true }
    );
  }

  render() {
    const { order } = this.state;
    return (
      <DefaultLayout type="restaurant">
        <ScrollView>
          <View>
            {
              order.items && order.items.map(item => (
                <OrderItem key={item.uuid + "_" + item.metadata} data={item} />
              ))
            }
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 18, marginBottom: 4, backgroundColor: theme.SECONDARY_COLOR }}>
              <Title type="h5" style={{ fontSize: 16, color: theme.PRIMARY_COLOR }}>Total: {order.total_price} ₺</Title>
            </View>
          </View>
        </ScrollView>
        <Footer style={{ justifyContent: 'space-between', paddingHorizontal: 16 }}>
          <Button
            onPress={() => this._requestAccount()}
            style={styles.button}
            title="Request Account"
            size="small"
            type="secondary"
          />
          <Button
            onPress={() => this._onlinePayment()}
            style={styles.button}
            title="Online Payment"
          />
          <Button
            onPress={() => this._callWaiter()}
            style={styles.button}
            title="Waiter / Waitress"
            type="secondary"
          />
        </Footer>
      </DefaultLayout>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 8,
  }
});

export default RequestScreen;
