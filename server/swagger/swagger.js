import swaggerJSDoc from 'swagger-jsdoc';

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
        description: 'Local server',
    },
    {
        url: 'https://proyectoweb3-alm2.onrender.com',
        description: 'Servidor Publico',
    }
]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;