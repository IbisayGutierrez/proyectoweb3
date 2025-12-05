import express from 'express';
import * as usuarioService from '../services/usuariosService.js';

const router = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     description: Retorna la lista completa de usuarios registrados en el sistema
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Juan Pérez
 *                   correo:
 *                     type: string
 *                     example: juan@example.com
 *                   telefono:
 *                     type: string
 *                     example: "+34612345678"
 *                   direccion:
 *                     type: string
 *                     example: Calle Falsa 123
 *                   rol:
 *                     type: string
 *                     example: ADMIN
 *                   estado:
 *                     type: string
 *                     example: ACTIVO
 *                   fecha_registro:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-12-01T10:30:00Z"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener los usuarios
 */
router.get('/', async (req, res) => {
    try {
        const usuarios = await usuarioService.getUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     description: Retorna la información detallada de un usuario específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del usuario
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez
 *                 correo:
 *                   type: string
 *                   example: juan@example.com
 *                 telefono:
 *                   type: string
 *                   example: "+34612345678"
 *                 direccion:
 *                   type: string
 *                   example: Calle Falsa 123
 *                 rol:
 *                   type: string
 *                   example: ADMIN
 *                 estado:
 *                   type: string
 *                   example: ACTIVO
 *                 fecha_registro:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-12-01T10:30:00Z"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el usuario
 */
router.get('/:id', async (req, res) => {
    try {
        const usuario = await usuarioService.getUsuarioPorId(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

/**
 * @swagger
 * /api/usuarios/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     description: Crea un nuevo usuario en el sistema con estado ACTIVO por defecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - password_hash
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico único del usuario
 *                 example: juan.perez@example.com
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del usuario
 *                 example: "+34612345678"
 *               direccion:
 *                 type: string
 *                 description: Dirección física del usuario
 *                 example: "Calle Falsa 123, Madrid"
 *               rol:
 *                 type: string
 *                 description: Rol del usuario en el sistema
 *                 enum: [ADMIN, VOLUNTARIO, ADOPTANTE, VISITANTE]
 *                 example: ADMIN
 *               password_hash:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario (será hasheada)
 *                 example: MiContraseñaSegura123
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente con estado ACTIVO
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_usuario:
 *                   type: integer
 *                   example: 1
 *                 nombre:
 *                   type: string
 *                   example: Juan Pérez
 *                 correo:
 *                   type: string
 *                   example: juan.perez@example.com
 *                 telefono:
 *                   type: string
 *                   example: "+34612345678"
 *                 direccion:
 *                   type: string
 *                   example: "Calle Falsa 123, Madrid"
 *                 rol:
 *                   type: string
 *                   example: ADMIN
 *                 estado:
 *                   type: string
 *                   example: ACTIVO
 *                 fecha_registro:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-12-01T10:30:00Z"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Datos incompletos o inválidos
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al crear el usuario
 */
router.post('/register', async (req, res) => {
    try {
        const nuevoUsuario = await usuarioService.crearUsuario(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuarios]
 *     description: Actualiza la información de un usuario. NO incluye cambio de contraseña (usa PATCH /usuarios/:id/password)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del usuario a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del usuario
 *                 example: Juan Pérez Actualizado
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *                 example: juan.nuevo@example.com
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del usuario
 *                 example: "+34612345678"
 *               direccion:
 *                 type: string
 *                 description: Dirección física del usuario
 *                 example: "Calle Nueva 456, Barcelona"
 *               rol:
 *                 type: string
 *                 description: Rol del usuario en el sistema
 *                 enum: [ADMIN, VOLUNTARIO, ADOPTANTE, VISITANTE]
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el usuario
 */
router.put('/:id', async (req, res) => {
    try {
        await usuarioService.actualizarUsuario(req.params.id, req.body);
        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

/**
 * @swagger
 * /api/usuarios/{id}/password:
 *   patch:
 *     summary: Cambiar la contraseña de un usuario
 *     tags: [Usuarios]
 *     description: Actualiza únicamente la contraseña de un usuario específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del usuario
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Nueva contraseña del usuario
 *                 example: NuevaContraseñaSegura123
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada exitosamente
 *       400:
 *         description: Contraseña no proporcionada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: La contraseña es requerida
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al cambiar la contraseña
 */
router.patch('/:id/password', async (req, res) => {
    try {
        const { password } = req.body;
        
        if (!password || password.trim() === '') {
            return res.status(400).json({ error: 'La contraseña es requerida' });
        }
        
        await usuarioService.cambiarContrasena(req.params.id, password);
        res.json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario (cambio de estado a INACTIVO)
 *     tags: [Usuarios]
 *     description: Cambia el estado del usuario a INACTIVO sin eliminarlo físicamente de la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del usuario a desactivar
 *         example: 1
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario desactivado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al desactivar el usuario
 */
router.delete('/:id', async (req, res) => {
    try {
        await usuarioService.eliminarUsuario(req.params.id);
        res.json({ message: 'Usuario desactivado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al desactivar el usuario' });
    }
});

export default router;
