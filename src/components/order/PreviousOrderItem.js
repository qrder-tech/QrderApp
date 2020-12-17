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

import moment from 'moment';

import Card from '../Card';
import IconButton from '../IconButton';

import theme from '../../styles/theme.style';

const PreviousOrderItem = (props) => {
  const { data } = props;
  const { total_price, restaurant, updatedAt } = data;
  const { name, rank } = restaurant;

  return (
    <View style={[styles.wrapper, theme.SHADOW]}>
      <View style={styles.rankWrapper}>
        <Text style={[styles.text, styles.rank]}>{rank}</Text>
      </View>
      <View style={styles.body}>
        <View style={{ flex: 1, paddingLeft: 16, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={[styles.text, styles.title]}>{name}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
          <Text style={styles.text}>{moment(updatedAt).fromNow()}</Text>
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
    fontSize: 16,
    textTransform: 'capitalize',
  },
  title: {
    fontWeight: 'bold',
    marginTop: 0,
  },
});

export default PreviousOrderItem;
