const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API',
  },
  host: '', // add render host url
  schemes: ['https', 'http'], // won't run on http. Render runs on https
};

const outputFile = 'swagger.json'; // ./swagger.json
const endpointsFiles = ['./index.js']; //./routes/index.js

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);