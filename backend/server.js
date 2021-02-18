const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const users = require('./routes/users');
const auth = require('./routes/auth');
const orgs = require('./routes/orgs');

const app = express();
app.use(express.json());

app.use('/users', users);
app.use('/auth', auth);
app.use('/orgs', orgs);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('App listening at: http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404);
  res.json({ msg: 'This route or method is not defined!' });
});

// 500 Error Handler
app.use((err, req, res, next) => {
  res.status(500);
  res.json({ msg: err.message, error: err });

  console.log('Error status: ', err.status);
  console.log('Message: ', err.message);
});
