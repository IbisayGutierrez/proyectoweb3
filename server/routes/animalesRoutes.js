import express from 'express';
import * as animalesService from '../services/animalesService.js';
import { verificarToken } from '../middleware/loginMiddleware.js';
import { rolMiddleware } from '../middleware/rolMiddleware.js';

const router = express.Router();

// GET: lista de animales activos (con filtro opcional por estado)
router.get('/', async (req, res) => {
	try {
		const { estado } = req.query;
		const animales = await animalesService.getAnimales(estado);
		res.json(animales);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener los animales' });
	}
});

// GET: animal por id (solo si está activo)
router.get('/:id', async (req, res) => {
	try {
		const animal = await animalesService.getAnimalPorId(req.params.id);
		if (!animal) {
			return res.status(404).json({ error: 'Animal no encontrado o inactivo' });
		}
		res.json(animal);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener el animal' });
	}
});

// POST: crear animal (solo ADMIN)
router.post('/', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
	try {
		const resultado = await animalesService.crearAnimal(req.body);
		res.status(201).json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear el animal' });
	}
});

// PUT: actualizar animal (solo ADMIN)
router.put('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
	try {
		const resultado = await animalesService.actualizarAnimal(req.params.id, req.body);
		res.json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar el animal' });
	}
});

// DELETE: desactivar animal (borrado lógico, solo ADMIN)
router.delete('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
	try {
		const resultado = await animalesService.desactivarAnimal(req.params.id);
		res.json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al desactivar el animal' });
	}
});

export default router;
