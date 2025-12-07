
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger.js';

import usuarioRoutes from './routes/usuarioRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js';
import historialRoutes from './routes/historialRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import animalesRoutes from './routes/animalesRoutes.js';





const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tareas', tareasRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/animales', animalesRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});