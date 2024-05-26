// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sentimental Analysis',
      version: '1.0.0',
      description: 'Sentimental Asalysis',
    },
  },
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
