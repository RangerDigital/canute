const express = require('express');
const helmet = require('helmet');

require('dotenv').config();
require('express-async-errors');

const devices = require('./routes/devices');
const health = require('./routes/health');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(helmet());
app.use('/devices', devices);
app.use('/health', health);

app.use((req, res) => {
  res.status(404).json({ msg: 'This route or method is not defined!' });
});

module.exports = app;
