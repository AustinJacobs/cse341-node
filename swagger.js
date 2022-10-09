const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API',
  },
  host: 'https://cse341-node-br28.onrender.com', // add render host url
  schemes: ['https'], // won't run on http. Render runs on https
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);