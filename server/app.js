

require('dotenv').config();

const express = require('express');
const app = express();

require('express')();listen(3000, () => {
  console.log('Server is running on port 3000');
});

require('dotenv').config();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const { swaggerSpec, server: swaggerUi } = require('./swagger/swagger');
const swaggerUiExpress = require('swagger-ui-express');



