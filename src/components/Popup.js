import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card';

const Popup = (props) => {
  const { children, style, onPress } = props;

  return (
    <View style={[styles.wrapper, style]}>
      {children}
      <TouchableOpacity style={styles.outside} onPress={onPress}></TouchableOpacity>
    </View>
  );
};

const propStyles = {

};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(70, 70, 70, 0.2)',
    padding: 48,
    paddingBottom: 64 + 48
  },
  outside: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
});

Popup.defaultProps = {

};

Popup.propTypes = {
};

module.exports = Popup;
