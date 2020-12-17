import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const TextComponent = (props) => {
  const { children, style, size } = props;

  return <Text style={[styles.text, propStyles[size], style]}>{children}</Text>;
};

const propStyles = {
  small: {
    fontSize: 8
  },
  sm: {
    fontSize: 12
  },
  medium: {
    fontSize: 16
  },
  ml: {
    fontSize: 20
  },
  large: {
    fontSize: 24
  }
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    padding: 0,
    margin: 0,
  },
});

TextComponent.defaultProps = {
  size: 'medium',
};

TextComponent.propTypes = {
  size: PropTypes.oneOf(['small', 'sm', 'medium', 'ml', 'large']),
};

export default TextComponent;
