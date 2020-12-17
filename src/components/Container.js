import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import theme from '../styles/theme.style';

const common = {
  colors: {
    backgroundColor: {
      primary: theme.PRIMARY_BACKGROUND_COLOR,
      secondary: theme.SECONDARY_COLOR,
    },
  },
};

const Container = (props) => {
  const { children, type } = props;

  return (
    <>
      <StatusBar
        backgroundColor={common.colors.backgroundColor[type]}
        barStyle="dark-content"
      />
      <ScrollView
        style={{ backgroundColor: common.colors.backgroundColor[type] }}
        contentContainerStyle={styles.wrapper}>
        {children}
      </ScrollView>
      <KeepAwake />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
    minHeight: '100%',
  },
});

Container.defaultProps = {
  type: 'primary',
};

Container.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
};

export default Container;
