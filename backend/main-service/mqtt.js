const mqtt = require('mqtt');
const config = require('./configs/config');

let client;

const connect = () => {
  client = mqtt.connect(config.mqtt.url, { username: config.mqtt.username, password: config.mqtt.password });

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
