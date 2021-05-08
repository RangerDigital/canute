const app = require('./server');
const mongoose = require('mongoose');
const mqtt = require('./mqtt');

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(3000, function (err, address) {
      if (err) {
        fastify.log.error(err);
      }

      app.log.info(`Server listening on ${address}`);

      app.ready((err) => {
        if (err) throw err;
        app.swagger();
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

mqtt.connect();
