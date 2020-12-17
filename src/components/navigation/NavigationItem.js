import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../styles/theme.style';

import Title from '../Title';

const NavigationItem = (props) => {
  const { iconName, callback, title } = props;

  return (
    <TouchableOpacity
      style={[styles.wrapper, theme.SHADOW]}
      activeOpacity={0.7}
      onPress={callback}
    >
      <View style={styles.iconWrapper}>
        <Icon name={iconName} color={theme.SECONDARY_COLOR} size={24} />
      </View>

      <View style={styles.titleWrapper}>
        <Title type="h5">{title}</Title>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 74,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomColor: theme.OUTLINE_COLOR,
    borderBottomWidth: 1,
  },
  iconWrapper: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

export default NavigationItem;
