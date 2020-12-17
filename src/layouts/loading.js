import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import theme from '../styles/theme.style';

const Loading = (props) => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={theme.PRIMARY_COLOR} />
    </View>
  );
};

const propStyles = {
  colors: {
    primary: {
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    },
    secondary: {
      backgroundColor: theme.SECONDARY_COLOR,
    },
  },
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 9999,
    elevation: 9999,
    width: '100%',
    height: '100%',
    backgroundColor: theme.SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

Loading.defaultProps = {
  loading: false,
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
