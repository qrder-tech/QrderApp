import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import theme from '#/styles/theme.style';

import Image from './Image';

const Avatar = (props) => {
  const { style } = props;

  return (
    <View style={[styles.wrapper, style]}>
      <Image
        style={{ elevation: 3 }}
        shape="circle"
        source={{ uri: 'https://www.nicepng.com/png/detail/186-1866063_dicks-out-for-harambe-sample-avatar.png' }}
      />
    </View>
  );
};

const propStyles = {

};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Avatar.defaultProps = {

};

Avatar.propTypes = {

};

export default Avatar;
