import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import theme from '#/styles/theme.style';

const Button = (props) => {
  const { type, title, size, titleSize, style, titleStyle, onPress } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        propStyles.size[size],
        propStyles.button[type],
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Text
        style={[
          styles.title,
          propStyles.titleSize[titleSize],
          propStyles.title[type],
          titleStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const propStyles = {
  button: {
    primary: {
      backgroundColor: theme.PRIMARY_BUTTON_COLOR,
      borderColor: theme.PRIMARY_BUTTON_COLOR,
    },
    secondary: {
      backgroundColor: theme.SECONDARY_BUTTON_COLOR,
      borderColor: theme.SECONDARY_BUTTON_COLOR,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.PRIMARY_BUTTON_COLOR,
    },
  },
  title: {
    primary: {
      color: theme.PRIMARY_COLOR,
    },
    secondary: {
      color: theme.SECONDARY_COLOR,
    },
    outline: {
      color: theme.PRIMARY_COLOR,
    },
  },
  size: {
    small: {
      width: '45%',
      padding: 16,
    },
    medium: {
      width: '75%',
      padding: 16,
    },
    large: {
      width: '100%',
      padding: 32,
    },
    half: {
      width: '50%',
      padding: 16
    },
    full: {
      width: '100%',
      padding: 16
    }
  },
  titleSize: {
    small: {
      fontSize: 16,
    },
    medium: {
      fontSize: 16,
    },
    large: {
      fontSize: 32,
    },
  },
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    borderWidth: 1,
  },
  title: {
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

Button.defaultProps = {
  type: 'primary',
  size: 'medium',
  titleSize: 'medium',
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'half', 'full']),
  titleSize: PropTypes.oneOf(['small', 'medium', 'large']),
};

module.exports = Button;
