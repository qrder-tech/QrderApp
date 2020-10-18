import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  console.log(`[Store] SET | ${key}:${value}`);
  return AsyncStorage.setItem(key, value);
}

export const getData = async key => {
  console.log(`[Store] GET | ${key}`);
  return AsyncStorage.getItem(key);
}

export const AuthContext = React.createContext();