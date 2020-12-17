import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, StyleSheet } from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import Loading from './loading';
import theme from '../styles/theme.style';

const Layout = (props) => {
  const { children, color, loading, type, style } = props;

  return (
    <>
      <StatusBar
        {...propStyles.statusBar[type]}
        barStyle="dark-content"
      />

      {
        loading ?
          <Loading />
          :
          <View style={[styles.wrapper, propStyles.view[type], style]}>
            {children}
          </View>
      }

      <KeepAwake />
    </>
  );
};

const propStyles = {
  statusBar: {
    default: {
      backgroundColor: theme.PRIMARY_COLOR,
    },
    restaurant: {
      backgroundColor: theme.PRIMARY_COLOR
    }
  },
  view: {
    default: {
      paddingHorizontal: 16,
    },
    restaurant: {
      paddingHorizontal: 0
    }
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 16
  },
});

Layout.defaultProps = {
  color: 'primary',
  type: 'default'
};

Layout.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']),
  type: PropTypes.oneOf(['default', 'auth', 'main', 'restaurant']),
};

export default Layout;
