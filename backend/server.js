const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const users = require('./routes/users');
const auth = require('./routes/auth');

const app = express();
app.use(express.json());

app.use('/users', users);
app.use('/auth', auth);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('App listening at: http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
