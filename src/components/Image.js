import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import theme from '#/styles/theme.style';

const ImageComponent = (props) => {
  const { imageStyle, shape, source, style, resizeMode } = props;

  return (
    <View style={[styles.wrapper, propsStyles[shape], style]}>
      <Image
        resizeMode={resizeMode}
        source={source}
        style={[styles.image, imageStyle]}
      />
    </View>
  );
};

const propsStyles = {
  rectangle: {
    borderRadius: 0,
  },
  circle: {
    borderRadius: 9999,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: theme.SECONDARY_COLOR,
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

ImageComponent.defaultProps = {
  shape: 'rectangle',
  resizeMode: 'cover'
};

ImageComponent.propTypes = {
  shape: PropTypes.oneOf(['rectangle', 'circle']),
};

export default ImageComponent;
