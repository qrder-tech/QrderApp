import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Avatar from '../Avatar';
import Title from '../Title';

import theme from '#/styles/theme.style';

const HeaderTitle = (props) => {
  const { style, title } = props;

  return (
    <View style={[styles.wrapper, style]}>
      <View>
        <Avatar />
      </View>
      <Title type="h5">{title}</Title>
      <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
        <Title type="h5">Qrder.tech</Title>
      </View>
    </View>
  );
};

const propStyles = {

};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

HeaderTitle.defaultProps = {

};

HeaderTitle.propTypes = {

};

export default HeaderTitle;
