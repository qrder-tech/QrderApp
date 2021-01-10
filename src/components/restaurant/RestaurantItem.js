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
import IconButton from '../IconButton';


import theme from '../../styles/theme.style';

const RestaurantItem = (props) => {
  const { data, deleteCallback } = props;
  const { name, img } = data;

  return (
    <View style={[styles.wrapper, theme.SHADOW]}>
      <View style={[styles.imageWrapper]}>
        <Image
          style={styles.image}
          source={{ uri: img || null }}
        />
      </View>
      <View style={styles.body}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
          <Text style={[styles.text, styles.title]}>{name}</Text>
        </View>
      </View>
      {
        deleteCallback && (
          <View style={styles.iconWrapper}>
            <IconButton name="times" color="tomato" size={24} onPress={deleteCallback} />
          </View>
        )
      }
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
  imageWrapper: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 9999,
    marginRight: 16,
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
  iconWrapper: {
    justifyContent: 'center',
  }
});

export default RestaurantItem;
