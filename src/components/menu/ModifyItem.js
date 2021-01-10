import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';
import theme from '#/styles/theme.style';

import Button from '../Button';
import Card from '../Card';
import Image from '../Image';
import Popup from '../Popup';
import Title from '../Title';
import IconButton from '../IconButton';
import Footer from '../Footer';

const ModifyItem = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [meta, setMeta] = useState({});

  const { data, callback, onPress } = props;
  const { name, img, desc, price, options } = data;

  return (
    <Popup onPress={onPress}>
      <Card style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <View style={[styles.imageWrapper]}>
              <Image
                style={styles.image}
                source={{ uri: img || null }}
              />
            </View>
            <View style={styles.titleWrapper}>
              <Title type="h5" style={styles.title}>{name}</Title>
              <Title type="h4" style={styles.subtitle}>{desc}</Title>
            </View>
          </View>

          <View style={styles.subHeader}>
            <View style={styles.quantityWrapper}>
              <View>
                <IconButton name="minus" size={18} onPress={() => quantity > 1 && setQuantity(quantity - 1)} />
              </View>
              <Title style={{ marginHorizontal: 8 }} type="h6">{quantity} Quantity</Title>
              <View>
                <IconButton name="plus" size={18} onPress={() => quantity < 10 && setQuantity(quantity + 1)} />
              </View>
            </View>
            <View style={styles.priceWrapper}>
              <Title type="h5">{price} ₺</Title>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {
            options && options.split(';').map(m => (
              <View key={m} style={styles.setting}>
                <CheckBox value={meta[m]} onValueChange={(v) => setMeta({ ...meta, [m]: v })} />
                <Text style={{ textTransform: 'capitalize' }}>{m}</Text>
              </View>
            )) || null
          }
        </View>

        <Footer>
          <Button
            onPress={() => callback({ quantity, meta })}
            title="Add to Basket"
          />
        </Footer>
      </Card>
    </Popup >
  );
};

const propStyles = {

};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerWrapper: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: theme.SECONDARY_COLOR,
    marginBottom: 8
  },
  header: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  subHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  imageWrapper: {
    width: '25%',
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    borderRadius: 9999,
  },
  titleWrapper: {
    flex: 1,
    paddingLeft: 8,
  },
  title: {
    textAlign: 'left',
    padding: 4,
    paddingBottom: 0,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'left',
    padding: 4,
    paddingBottom: 0,
  },
  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    width: '100%',
  },
  setting: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  }
});

ModifyItem.defaultProps = {

};

ModifyItem.propTypes = {
};

module.exports = ModifyItem;
