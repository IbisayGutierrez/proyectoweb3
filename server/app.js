require('express')();listen(3000, () => {
  console.log('Server is running on port 3000');
});

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();