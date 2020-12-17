import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

import theme from '../styles/theme.style';

const common = {
  padding: {
    none: {
      padding: 0,
    },
    default: {
      padding: 8,
    },
    small: {
      padding: 16,
    },
    medium: {
      padding: 32,
    },
    large: {
      padding: 64,
    },
  },
  margin: {},
  radiusSize: {
    medium: {
      borderRadius: 12,
    },
    large: {
      borderRadius: 64,
    },
  },
  radiusSide: {
    up: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    none: {
      borderRadius: 0,
      borderWidth: 0,
    },
  },
};

const Card = (props) => {
  const {
    children,
    radiusSide,
    radiusSize,
    style,
  } = props;

  return (
    <View
      style={[
        styles.wrapper,
        theme.SHADOW,
        common.radiusSize[radiusSize],
        common.radiusSide[radiusSide],
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    borderColor: theme.PRIMARY_BACKGROUND_COLOR,
    borderWidth: 1,
    flex: 1,
  },
});

Card.defaultProps = {
  padding: 'default',
  radiusSide: 'all',
  radiusSize: 'medium',
  title: null,
  type: 'primary',
};

Card.propTypes = {
  padding: PropTypes.oneOf(['none', 'default', 'small', 'medium', 'large']),
  radiusSide: PropTypes.oneOf(['all', 'up', 'down', 'none']),
  radiusSize: PropTypes.oneOf(['medium', 'large']),
  title: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary']),
};

export default Card;
