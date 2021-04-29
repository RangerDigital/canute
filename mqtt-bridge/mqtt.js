const mqtt = require('mqtt');
const devices = require('./models/devices');

let client;

const connect = () => {
  client = mqtt.connect(process.env.MQTT_URL, { username: process.env.MQTT_USERNAME, password: process.env.MQTT_PASSWORD });

  client.on('error', (err) => {
    console.log(err);
  });

  client.on('connect', () => {
    console.log('Connected to broker!');

    client.subscribe('things/#');
  });

  // MQTT Routes
  client.on('message', async function (topic, msg) {
    const topicLevels = topic.split('/');
    const message = JSON.parse(msg.toString());

    console.log(topicLevels);
    console.log(message);

    let device = await devices.findOne({ _id: topicLevels[1] });

    if (!device) {
      return;
    }

    if (topicLevels[2] == 'status') {
      device.online = message.online;
    }

    if (topicLevels[2] == 'shadows' && device.initialised == false) {
      device.shadows = message;
      device.initialised = true;
    }

    device.save();
  });
};

// Module Exports
const subscribe = (topic) => {
  return client.subscribe(topic);
};

const publish = (topic, message) => {
  return client.publish(topic, message);
};

const connected = () => {
  return client.connected;
};

module.exports = { connect, subscribe, publish, connected };
