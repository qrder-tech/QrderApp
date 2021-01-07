import mqtt from 'mqtt/dist/mqtt';

import config from '#/config';

import { getData } from '../utils';

const mq = {};

mq.connected = false;
mq.client = null;

mq.init = async () => {
  if (mq.client) {
    return;
  }

  const clientId = `qrder-app-${await getData('uuid')}`;

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

    mq.client.subscribe('qrderApp/test', (err) => {
      if (err) {
        console.log('[error]:', err);
        return;
      }
    });
  });

  mq.client.on('message', (topic, message) => {
    console.warn(`[${topic}]: ${message.toString()}`);
  });
};

export default mq;