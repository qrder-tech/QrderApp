import React from 'react';
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

import Card from '../Card';
import IconButton from '../IconButton';

import theme from '../../styles/theme.style';

const OrderItem = (props) => {
  const { data } = props;
  const { name, desc, img, price, OrderItems } = data;
  const { quantity, options } = OrderItems;

  return (
    <View style={[styles.wrapper, theme.SHADOW]}>
      <View style={styles.quantityWrapper}>
        <Text style={[styles.text, styles.quantity]}>{quantity}</Text>
      </View>
      <View style={[styles.imageWrapper]}>
        <Image
          style={styles.image}
          source={{ uri: img || null }}
        />
      </View>
      <View style={styles.body}>
        <View style={{ flex: 4, paddingRight: 8 }}>
          <Text style={[styles.text, styles.title]}>{name}</Text>
          <Text style={[styles.text, styles.secondary]} numberOfLines={2}>
            {desc}
          </Text>
          <Text style={[styles.metadata]}>
            {options && options.split(';').join(", ")}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>{quantity * price} ₺</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 74,
    marginBottom: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  quantityWrapper: {
    justifyContent: 'center',
  },
  quantity: {
    textAlign: 'center',
    backgroundColor: theme.SECONDARY_COLOR,
    color: theme.PRIMARY_COLOR,
    padding: 8,
    aspectRatio: 1,
    borderRadius: 9999,
  },
  imageWrapper: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 9999,
    marginHorizontal: 16,
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
    textAlign: 'left',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 4,
  },
  secondary: {
    marginBottom: 4,
    fontSize: 12,
    color: theme.PRIMARY_COLOR
  },
  metadata: {
    color: theme.OUTLINE_COLOR,
    textTransform: 'capitalize'
  }
});

export default OrderItem;
