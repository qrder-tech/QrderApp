import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Avatar from '../Avatar';
import Title from '../Title';
import IconButton from '../IconButton';

import theme from '#/styles/theme.style';

import { addToFavourites, removeFromFavourites } from '#/lib/actions';

const RestaurantHeader = (props) => {
  const [favourite, setFavourite] = useState(null);
  const { restaurant, style } = props;

  const fav = (favourite !== null) ? favourite : (restaurant.favourite);

  const _toogleFavourite = async () => {
    if (!restaurant) {
      return;
    }

    if (fav) {
      removeFromFavourites({ restaurantUuid: restaurant.uuid }).then(payload => {
        setFavourite(false);
      }).catch(err => {
        console.warn(err);
      });
    } else {
      addToFavourites({ restaurantUuid: restaurant.uuid }).then(payload => {
        setFavourite(true);
      }).catch(err => {
        console.warn(err);
      });
    }
  }

  return (
    <View style={[styles.wrapper, style]}>
      {
        restaurant && (
          <>
            <View style={styles.iconWrapper}></View>
            <View style={styles.titleWrapper}>
              <Title type="h5">{restaurant && restaurant.name}</Title>
            </View>
            <View style={styles.iconWrapper}>
              <IconButton name="heart" size={20} color={theme.SECONDARY_COLOR} onPress={_toogleFavourite} solid={fav} />
            </View>
          </>
        )
      }
    </View>
  );
};

const propStyles = {

};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

RestaurantHeader.defaultProps = {

};

RestaurantHeader.propTypes = {

};

export default RestaurantHeader;
