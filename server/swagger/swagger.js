const swaggerJSDoc = require('swagger-jsdoc');
const { server } = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Adoptapet API',
    version: '1.0.0',
    description: 'Proyecto final de web 3 sobre adopcion de mascotas'
    },
    server: [
      {
        url: 'http://localhost:3000',
    },
]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;