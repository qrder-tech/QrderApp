import mqtt from 'mqtt/dist/mqtt';

import config from '#/config';
import { getData, displayNotification, displayImageNotification } from '#/lib/utils';


const mq = {};

mq.connected = false;
mq.client = null;

mq.init = async (callback = null) => {
  if (mq.client) {
    return;
  }

  const uuid = await getData('uuid');
  const clientId = `qrder-app-${uuid}`;

  mq.clientId = clientId;
  mq.client = mqtt.connect(`${config.mqtt.HOSTNAME}:${config.mqtt.PORT_TLS}`, {
    clientId,
    username: config.mqtt.USERNAME,
    password: config.mqtt.PASSWORD,
    keepalive: 0,
    clean: false,
  });

  mq.client.on('connect', () => {
    console.log(`🐇 Client is connected to MQTT broker as '${mq.clientId}'`);
    mq.connected = true;

    mq.client.subscribe('consumer/all', (err) => {
      if (err) {
        console.log('[error]:', err);
        return;
      }
    });

    mq.client.subscribe(`consumer/${uuid}`, (err) => {
      if (err) {
        console.log('[error]:', err);
        return;
      }
    });
  });

  mq.client.on('message', (topic, message) => {
    console.warn(`[${topic}]: ${message.toString()}`);
    if (topic === 'consumer/all') {
      displayImageNotification(topic, JSON.parse(message.toString()));
    } else {
      displayNotification(topic, message.toString());
    }
  });
};

export default mq;