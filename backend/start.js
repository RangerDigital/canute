const app = require('./server');
const mongoose = require('mongoose');
const catcher = require('./catcher');

catcher.connect();

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
