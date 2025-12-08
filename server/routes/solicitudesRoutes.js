import express from 'express';
import { verificarToken } from '../middleware/loginMiddleware.js';
import { rolMiddleware } from '../middleware/rolMiddleware.js';
import * as solicitudesService from '../services/solicitudesService.js';

const router = express.Router();

/**
 * @swagger
 * /api/solicitudes:
 *   get:
 *     summary: Obtener todas las solicitudes de adopción
 *     tags: [Solicitudes]
 *     description: Retorna la lista completa de solicitudes activas o filtra por estado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [PENDIENTE, APROBADA, RECHAZADA, COMPLETADA, CANCELADA]
 *         description: Filtrar solicitudes por estado
 *         example: "PENDIENTE"
 *     responses:
 *       200:
 *         description: Solicitudes obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo ADMIN y VOLUNTARIO
 *       500:
 *         description: Error al obtener las solicitudes
 */
router.get('/', verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO']), async (req, res) => {
	try {
		const { estado } = req.query;
		const solicitudes = await solicitudesService.getSolicitudes(estado);
		res.json(solicitudes);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener las solicitudes' });
	}
});

/**
 * @swagger
 * /api/solicitudes/mias:
 *   get:
 *     summary: Obtener mis solicitudes de adopción
 *     tags: [Solicitudes]
 *     description: Retorna todas las solicitudes del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Solicitudes del usuario obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *       500:
 *         description: Error al obtener tus solicitudes
 */
router.get('/mias', verificarToken , async (req, res) => {
	try {
		const solicitudes = await solicitudesService.getSolicitudesPorUsuario(req.usuario.id);
		res.json(solicitudes);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener tus solicitudes' });
	}
});

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   get:
 *     summary: Obtener una solicitud por ID
 *     tags: [Solicitudes]
 *     description: Retorna una solicitud específica si está activa
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *         example: 1
 *     responses:
 *       200:
 *         description: Solicitud obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo ADMIN y VOLUNTARIO
 *       404:
 *         description: Solicitud no encontrada o inactiva
 *       500:
 *         description: Error al obtener la solicitud
 */
router.get('/:id', verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO']), async (req, res) => {
	try {
		const solicitud = await solicitudesService.getSolicitudPorId(req.params.id);
		if (!solicitud) {
			return res.status(404).json({ error: 'Solicitud no encontrada o inactiva' });
		}
		res.json(solicitud);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener la solicitud' });
	}
});

/**
 * @swagger
 * /api/solicitudes:
 *   post:
 *     summary: Crear una nueva solicitud de adopción
 *     tags: [Solicitudes]
 *     description: Crea una solicitud de adopción (solo si el animal está DISPONIBLE)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_animal
 *             properties:
 *               id_animal:
 *                 type: integer
 *                 description: ID del animal a adoptar
 *                 example: 1
 *               observaciones:
 *                 type: string
 *                 description: Observaciones del solicitante
 *                 example: "Me encantaría adoptar este animal"
 *     responses:
 *       201:
 *         description: Solicitud creada exitosamente
 *       400:
 *         description: El animal no está disponible
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error al crear la solicitud
 */
router.post('/', verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO', 'ADOPTANTE']), async (req, res) => {
	try {
		const resultado = await solicitudesService.crearSolicitud(req.usuario.id, req.body);
		res.status(201).json(resultado);
	} catch (error) {
		if (error.statusCode === 400 || error.message === 'ANIMAL_NO_DISPONIBLE') {
			return res.status(400).json({ error: 'El animal no está disponible' });
		}
		res.status(500).json({ error: 'Error al crear la solicitud' });
	}
});

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   put:
 *     summary: Actualizar estado y observaciones de una solicitud
 *     tags: [Solicitudes]
 *     description: Actualiza el estado y observaciones (solo ADMIN y VOLUNTARIO)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [PENDIENTE, APROBADA, RECHAZADA, COMPLETADA, CANCELADA]
 *                 example: "APROBADA"
 *               observaciones:
 *                 type: string
 *                 example: "Documentación aprobada"
 *     responses:
 *       200:
 *         description: Solicitud actualizada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo ADMIN y VOLUNTARIO
 *       500:
 *         description: Error al actualizar la solicitud
 */
router.put('/:id', verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO']), async (req, res) => {
	try {
		const { estado, observaciones } = req.body;
		const resultado = await solicitudesService.actualizarSolicitud(req.params.id, { estado, observaciones });
		res.json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar la solicitud' });
	}
});

/**
 * @swagger
 * /api/solicitudes/{id}:
 *   delete:
 *     summary: Desactivar una solicitud (borrado lógico)
 *     tags: [Solicitudes]
 *     description: Desactiva una solicitud sin eliminarla de la BD (solo ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud a desactivar
 *         example: 1
 *     responses:
 *       200:
 *         description: Solicitud desactivada exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo ADMIN
 *       500:
 *         description: Error al desactivar la solicitud
 */
router.delete('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
	try {
		const resultado = await solicitudesService.desactivarSolicitud(req.params.id);
		res.json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al desactivar la solicitud' });
	}
});

export default router;
