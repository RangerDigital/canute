const app = require('./server');
const mongoose = require('mongoose');
const mqtt = require('./mqtt');

mqtt.connect();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(3000, '0.0.0.0', function (err) {
      if (err) {
        app.log.error(err);
      }

      app.swagger();
    });
  })
  .catch((err) => {
    console.log(err);
  });
