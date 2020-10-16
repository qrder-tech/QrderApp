import React from 'react';
import { StatusBar } from 'react-native';
import KeepAwake from 'react-native-keep-awake';

import theme from '../styles/theme.style';

const Container = (props) => {
  return (
    <React.Fragment>
      <StatusBar backgroundColor={theme.PRIMARY_BACKGROUND_COLOR} barStyle="dark-content" />
      {props.children}
      <KeepAwake />
    </React.Fragment>
  );
}

export default Container;