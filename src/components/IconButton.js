import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '#/styles/theme.style';


const IconButton = (props) => {
  const { color, name, onPress, size, style } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.5}>
      <Icon color={color} name={name} size={size} />
    </TouchableOpacity>
  );
};

const propStyles = {

};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8
  },
});

IconButton.defaultProps = {
  color: theme.PRIMARY_BUTTON_COLOR,
  size: 32
};

IconButton.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  size: PropTypes.number,
};

module.exports = IconButton;
