import express from 'express';
import * as animalesService from '../services/animalesService.js';
import { verificarToken } from '../middleware/loginMiddleware.js';
import { rolMiddleware } from '../middleware/rolMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const { estado } = req.query;
		const animales = await animalesService.getAnimales(estado);
		res.json(animales);
	} catch (error) {
		res.status(500).json({ error: 'Error al obtener los animales' });
	}
});

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

router.post('/crear', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
	try {
		const resultado = await animalesService.crearAnimal(req.body);
		res.status(201).json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al crear el animal' });
	}
});

router.put('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
	try {
		const resultado = await animalesService.actualizarAnimal(req.params.id, req.body);
		res.json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al actualizar el animal' });
	}
});

router.delete('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
	try {
		const resultado = await animalesService.desactivarAnimal(req.params.id);
		res.json(resultado);
	} catch (error) {
		res.status(500).json({ error: 'Error al desactivar el animal' });
	}
});

export default router;
