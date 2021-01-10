import React, { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import moment from 'moment';

import theme from '../../styles/theme.style';

const PreviousOrderItem = (props) => {
  const [collapsed, setCollapse] = useState(false);
  const iconName = collapsed ? "chevron-up" : "chevron-down";

  const { data } = props;
  const { Restaurant, updatedAt, totalPrice, Items } = data;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => setCollapse(!collapsed)} style={styles.touchable}>
      <View style={[styles.wrapper, theme.SHADOW]}>
        <View style={styles.rankWrapper}>
          <Icon name={iconName} color={theme.PRIMARY_COLOR} size={18} />
        </View>
        <View style={styles.body}>
          <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={[styles.text, styles.title]}>{Restaurant && Restaurant.name}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
            <Text style={[styles.text, { fontSize: 12 }]}>{moment(updatedAt).fromNow()}</Text>
          </View>
        </View>
      </View>
      {
        collapsed && (
          <View style={styles.collapeWrapper}>
            {
              Items && Items.map(item => (
                <View key={item.OrderItems.orderUuid + '_' + item.OrderItems.itemUuid + '_' + item.OrderItems.options} style={styles.OrderItems}>
                  <Text style={[styles.OrderItemsText, styles.OrderItemsQuantity]}>{item.OrderItems.quantity}</Text>
                  <Text style={[styles.OrderItemsText, styles.OrderItemsName]}>{item.name}</Text>
                  <Text style={[styles.OrderItemsText, styles.OrderItemsOptions]}>{item.OrderItems.options.split(';').join(', ')}</Text>
                  <Text style={[styles.OrderItemsText, styles.OrderItemsPrice]}>{item.OrderItems.quantity * item.price} ₺</Text>
                </View>
              ))
            }
            <Text style={styles.collapseTotalPrice}>Total Price: {totalPrice} ₺</Text>
          </View>
        )
      }
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 8,
  },
  wrapper: {
    width: '100%',
    height: 74,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  rankWrapper: {
    justifyContent: 'center',
  },
  rank: {
    textAlign: 'center',
    backgroundColor: '#00a31b',
    color: 'white',
    padding: 8,
    fontWeight: 'bold',
    borderRadius: 9999,
  },
  imageWrapper: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 9999,
    marginHorizontal: 16,
    backgroundColor: 'grey'
  },
  image: {
    flex: 1,
    borderRadius: 9999,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 0,
  },
  collapeWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'whitesmoke',
  },
  OrderItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  OrderItemsText: {
    textTransform: 'capitalize',
    fontSize: 12,
  },
  OrderItemsQuantity: {
    flex: 1,
  },
  OrderItemsName: {
    flex: 2,
  },
  OrderItemsOptions: {
    flex: 3,
    color: theme.OUTLINE_COLOR,
  },
  OrderItemsPrice: {
    flex: 1,
    textAlign: 'right',
  },
  collapseTotalPrice: {
    borderTopWidth: 1,
    paddingTop: 4,
    alignSelf: 'flex-end',
  }
});

export default PreviousOrderItem;
