import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '#/styles/theme.style';

import Image from './Image';

import banner_00 from '#/assets/images/banners/banner_00.png';
import banner_01 from '#/assets/images/banners/banner_01.png';
import banner_02 from '#/assets/images/banners/banner_02.png';
import banner_03 from '#/assets/images/banners/banner_03.png';
import banner_04 from '#/assets/images/banners/banner_04.png';


const DUMMY_BANNER = [
  banner_00,
  banner_01,
  banner_02,
  banner_03,
  banner_04
]

const SlideBox = (props) => {
  const [state, setState] = useState({
    loc: 2,
  });

  const data = DUMMY_BANNER;

  return (
    <View style={styles.wrapper}>
      {data && (
        <Image
          source={data[state.loc]}
          style={styles.banner}
        />
      )}
      <View style={styles.legend}>
        <Icon name="circle" color={theme.OUTLINE_COLOR} size={16} style={{ marginHorizontal: 2 }} />
        <Icon name="dot-circle" color={theme.PRIMARY_COLOR} size={16} style={{ marginHorizontal: 2 }} />
        <Icon name="circle" color={theme.OUTLINE_COLOR} size={16} style={{ marginHorizontal: 2 }} />
        <Icon name="circle" color={theme.OUTLINE_COLOR} size={16} style={{ marginHorizontal: 2 }} />
        <Icon name="circle" color={theme.OUTLINE_COLOR} size={16} style={{ marginHorizontal: 2 }} />
      </View>
    </View>
  );
}

const propStyles = {
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
  },
  banner: {

  },
  legend: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

SlideBox.defaultProps = {
};

SlideBox.propTypes = {
};

export default SlideBox;