import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '#/styles/theme.style';

import Card from './Card';
import Title from './Title';

const Collapse = (props) => {
  const [collapsed, setCollapse] = useState(false);

  const { badge, children, style, title } = props;

  const iconName = collapsed ? "chevron-up" : "chevron-down"

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => setCollapse(!collapsed)} style={style}>
      <Card radiusSide="none" style={styles.wrapper}>
        <View style={styles.badgeWrapper}>
          <Text style={[styles.text, styles.badge]}>{badge}</Text>
        </View>
        <View style={styles.iconWrapper}>
          <Icon color={theme.PRIMARY_COLOR} name={iconName} size={24} />
        </View>
        <Title style={styles.title} type="h5">{title}</Title>
      </Card>
      {collapsed && (
        <View style={styles.body}>
          {children}
        </View>
      )}
    </TouchableOpacity>
  );
};

const propStyles = {

};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.PRIMARY_BUTTON_COLOR,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
  },
  badgeWrapper: {
    position: 'absolute',
    left: 0,
    marginLeft: 16 + 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    right: 0,
    marginRight: 16 + 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    textAlign: 'center',
    backgroundColor: theme.PRIMARY_COLOR,
    color: theme.SECONDARY_COLOR,
    padding: 4,
    aspectRatio: 1,
    borderRadius: 9999,
  },
  title: {
    color: theme.PRIMARY_COLOR
  },
  body: {
    backgroundColor: theme.SECONDARY_COLOR,
    marginBottom: 8,
    paddingTop: 4,
  }
});

Collapse.defaultProps = {
};

Collapse.propTypes = {
};

export default Collapse;
