import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '#/styles/theme.style';

import Image from './Image';

const SlideBox = (props) => {
  const [state, setState] = useState({
    loc: 0,
  });

  const { data } = props;

  return (
    <View style={styles.wrapper}>
      {data && (
        <Image
          source={{ uri: data[state.loc].img }}
          style={styles.banner}
        />
      )}
      <View style={styles.legend}>
        {
          data && data.map((offer, index) => (
            <Icon name={state.loc === index ? "dot-circle" : "circle"} color={state.loc === index ? theme.PRIMARY_COLOR : theme.OUTLINE_COLOR} size={16} style={{ marginHorizontal: 2 }} />
          ))
        }
      </View>
    </View>
  );
}

const propStyles = {
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
  },
  banner: {

  },
  legend: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

SlideBox.defaultProps = {
};

SlideBox.propTypes = {
};

export default SlideBox;