const mqtt = require('mqtt');

let client;

const connect = () => {
  client = mqtt.connect(process.env.MQTT_URL, { username: process.env.MQTT_USERNAME, password: process.env.MQTT_PASSWORD });

  client.on('error', (err) => {
    console.log(err);
  });

  client.on('connect', () => {
    console.log('Connected to broker!');
  });
};

// Module Exports
const subscribe = (topic) => {
  return client.subscribe(topic);
};

const publish = (topic, message) => {
  return client.publish(topic, message);
};

module.exports = { connect, subscribe, publish };
