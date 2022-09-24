const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.connectDb((e, mongodb) => {
  if (e) {
    console.log(e);
  } else {
    app.listen(port);
    console.log(`App running on http://localhost:${port}`);
  }
});
