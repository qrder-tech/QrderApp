import AsyncStorage from '@react-native-community/async-storage';
import notifee, { AndroidColor, AndroidImportance, AndroidStyle } from '@notifee/react-native';

const NOTIFICATION_MESSAGES = {
  ready: 'Your order is ready!',
}

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

export const displayNotification = async (topic, message) => {
  if (!NOTIFICATION_MESSAGES[message]) {
    return;
  }

  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'important',
    name: 'Order Channel',
    lights: true,
    lightColor: AndroidColor.RED,
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: `${NOTIFICATION_MESSAGES[message]}`,
    body: 'Hurry! Go and get it',
    android: {
      channelId,
      smallIcon: 'ic_launcher_round',
      importance: AndroidImportance.HIGH,
    },
  });
}

export const displayImageNotification = async (topic, message) => {
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'offer',
    name: 'Offer Channel',
    lights: true,
    lightColor: AndroidColor.RED,
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: message.name,
    body: message.desc || 'New offer!',
    android: {
      channelId,
      smallIcon: 'ic_launcher_round',
      importance: AndroidImportance.HIGH,
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: message.img
      },
    },
  });
}