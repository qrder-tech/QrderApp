import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import theme from '#/styles/theme.style';

const Title = (props) => {
  const { children, style, type } = props;

  return <Text style={[styles.text, propStyles[type], style]}>{children}</Text>;
};

const propStyles = {
  h1: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 16,
    color: theme.PRIMARY_COLOR,
  },
  h5: {
    fontSize: 20,
  }
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'normal',
    textAlign: 'center',
    textTransform: 'capitalize',
    padding: 8,
    margin: 0,
    color: theme.SECONDARY_COLOR
  },
});

Title.defaultProps = {
  type: 'h1',
};

Title.propTypes = {
  type: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
};

export default Title;
