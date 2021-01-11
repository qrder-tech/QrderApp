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

import theme from '../../styles/theme.style';

const Item = (props) => {
  const { data, onPress } = props;
  const { name, desc, price, img, enabled } = data;

  return (
    <TouchableOpacity style={[styles.wrapper, theme.SHADOW]} onPress={onPress} disabled={!enabled}>
      <View style={[styles.imageWrapper]}>
        <Image
          style={styles.image}
          source={{ uri: img || null }}
        />
      </View>
      <View style={styles.body}>
        <View style={{ flex: 4, paddingRight: 8 }}>
          <Text style={[styles.text, styles.title]}>{name}</Text>
          <Text style={[styles.text, styles.secondary]} numberOfLines={1}>
            {desc}
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>{price} ₺</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  },
  image: {
    flex: 1,
    borderRadius: 9999,
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 16,
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
  },
  secondary: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Item;
