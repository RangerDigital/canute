require('dotenv').config();

module.exports = {
  mongo: {
    url: process.env.MONGO_URL,
  },
  mqtt: {
    url: process.env.MQTT_URL,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  },
};
