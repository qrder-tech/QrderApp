import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '#/styles/theme.style';

const Input = (props) => {
  const { iconName, name, onChangeText, placeholder, secureTextEntry, style, value } = props;

  return (
    <View style={[styles.wrapper, style]} >
      {iconName && (
        <View style={styles.iconWrapper}>
          <Icon color={theme.SECONDARY_COLOR} name={iconName} size={24} />
        </View>
      )}
      <TextInput
        name={name}
        onChangeText={onChangeText && ((text) => onChangeText(name, text))}
        placeholder={placeholder}
        placeholderTextColor={'#eee'}
        style={[styles.input]}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    color: theme.SECONDARY_COLOR,
    borderColor: theme.SECONDARY_COLOR,
    // borderRadius: 16,
    // borderWidth: 1,
    // margin: 16,
    // backgroundColor: '#b5b8b6',
  },
  iconWrapper: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    padding: 8,
  },
});

export default Input;
