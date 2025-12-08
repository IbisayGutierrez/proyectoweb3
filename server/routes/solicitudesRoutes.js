import express from 'express';
import { verificarToken } from '../middleware/loginMiddleware.js';
import { rolMiddleware } from '../middleware/rolMiddleware.js';
import * as solicitudesService from '../services/solicitudesService.js';

const router = express.Router();

router.get('/', verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO']), async (req, res) => {
	try {
		const { estado } = req.query;
		const solicitudes = await solicitudesService.getSolicitudes(estado);
		res.json(solicitudes);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener las solicitudes' });
	}
});

router.get('/mias', verificarToken , async (req, res) => {
	try {
		const solicitudes = await solicitudesService.getSolicitudesPorUsuario(req.usuario.id);
		res.json(solicitudes);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener tus solicitudes' });
	}
});

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

router.put('/:id', verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO']), async (req, res) => {
	try {
		const { estado, observaciones } = req.body;
		const resultado = await solicitudesService.actualizarSolicitud(req.params.id, { estado, observaciones });
		res.json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar la solicitud' });
	}
});

router.delete('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
	try {
		const resultado = await solicitudesService.desactivarSolicitud(req.params.id);
		res.json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al desactivar la solicitud' });
	}
});

export default router;
