import express from 'express';
import * as loginController from '../controllers/loginController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Limitar los intentos de login para prevenir ataques de fuerza bruta
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Limitar a 10 intentos por ventana
    message: {
        error: 'Demasiados intentos de inicio de sesión desde esta IP, por favor intente de nuevo después de 15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Login]
 *     description: Autentica un usuario y devuelve un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - password
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *                 example: contraseña123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id_usuario:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: Juan Pérez
 *                     correo:
 *                       type: string
 *                       example: usuario@example.com
 *                     rol:
 *                       type: string
 *                       example: ADMIN
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Credenciales inválidas
 *       429:
 *         description: Demasiados intentos de inicio de sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Demasiados intentos de inicio de sesión desde esta IP, por favor intente de nuevo después de 15 minutos
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error en el servidor
 */

// Ruta de login
router.post('/login', loginLimiter, loginController.iniciarSesion);

export default router;