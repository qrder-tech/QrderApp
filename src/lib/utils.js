import AsyncStorage from '@react-native-community/async-storage';

export const reduceObj = (obj, whitelist, blacklist) => {
  if (!whitelist && !blacklist) {
    throw new Error('Either whitelist or blacklist must be given!');
  }

  if (whitelist && blacklist) {
    throw new Error('Only one of whitelist or blacklist must be given!');
  }

  if (whitelist) {
    return Object.keys(obj)
      .filter((key) => whitelist.includes(key))
      .reduce((reduced, key) => {
        reduced[key] = obj[key];
        return reduced;
      }, {});
  }

  return Object.keys(obj)
    .filter((key) => !blacklist.includes(key))
    .reduce((reduced, key) => {
      reduced[key] = obj[key];
      return reduced;
    }, {});
};

export const storeData = async (key, value) => {
  console.log(`[Store] SET | ${key}:${value}`);
  return AsyncStorage.setItem(key, value);
};

export const getData = async (key) => {
  console.log(`[Store] GET | ${key}`);
  return AsyncStorage.getItem(key);
};

export const reduceError = (err) => {
  const whitelist = ['status', 'data'];
  return reduceObj(err, whitelist, null);
};