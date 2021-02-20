const mqtt = require('mqtt');
const devices = require('./models/devices');

let client;

const connect = () => {
  client = mqtt.connect(process.env.MQTT_URL);

  client.on('error', (err) => {
    console.log(err);
  });

  client.on('connect', () => {
    console.log('Connected to broker!');

    client.subscribe('hello/shadows/#');
  });

  client.on('message', async function (topic, message) {
    const deviceId = topic.split('/')[2];

    let device = await devices.findOne({ _id: deviceId });

    if (!device) {
      return;
    }

    message = JSON.parse(message.toString());

    let index = device.shadows.findIndex((x) => x.topic == topic);

    if (index != -1) {
      device.shadows[index].reported = message.value;
    } else {
      device.shadows.push({ topic: topic, reported: message.value });
    }

    device.save();
  });
};

const subscribe = (topic) => {
  console.log('Subscribed to: ', topic);
  return client.subscribe(topic);
};

const publish = (topic, message) => {
  return client.publish(topic, message);
};

module.exports = { connect, subscribe, publish };
