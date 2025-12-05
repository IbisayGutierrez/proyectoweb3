import express from 'express';
import { rolMiddleware } from '../middleware/rolMiddleware.js';
import { verificarToken } from '../middleware/loginMiddleware.js';
import * as historialService from '../services/historialService.js';

const router = express.Router();

/**
 * @swagger
 * /api/historial:
 *   get:
 *     summary: Obtener todo el historial médico
 *     tags: [Historial]
 *     description: Retorna la lista completa de registros del historial médico de todos los animales
 *     responses:
 *       200:
 *         description: Historial obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_historial:
 *                     type: integer
 *                     example: 1
 *                   id_animal:
 *                     type: integer
 *                     example: 5
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: "2025-12-01"
 *                   descripcion:
 *                     type: string
 *                     example: "Revisión general de salud"
 *                   tratamiento:
 *                     type: string
 *                     example: "Vacunación anual"
 *                   veterinario:
 *                     type: string
 *                     example: "Dr. González"
 *                   notas_adicionales:
 *                     type: string
 *                     example: "Animal en buen estado de salud"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el historial
 */
// Obtener todos los historiales
router.get('/', async (req, res) => {
    try {
        const historial = await historialService.getHistorial();
        res.json(historial);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial' });
    }
});

/**
 * @swagger
 * /api/historial/{id}:
 *   get:
 *     summary: Obtener un registro del historial por ID
 *     tags: [Historial]
 *     description: Retorna la información detallada de un registro específico del historial médico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro del historial
 *         example: 1
 *     responses:
 *       200:
 *         description: Registro del historial encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_historial:
 *                   type: integer
 *                   example: 1
 *                 id_animal:
 *                   type: integer
 *                   example: 5
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-01"
 *                 descripcion:
 *                   type: string
 *                   example: "Revisión general de salud"
 *                 tratamiento:
 *                   type: string
 *                   example: "Vacunación anual"
 *                 veterinario:
 *                   type: string
 *                   example: "Dr. González"
 *                 notas_adicionales:
 *                   type: string
 *                   example: "Animal en buen estado de salud"
 *       404:
 *         description: Historial no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Historial no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el historial
 */




// Obtener un registro del historial por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const historial = await historialService.getHistorialPorId(id);
        if (historial) {
            res.json(historial);
        } else {
            res.status(404).json({ error: 'Historial no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial' });
    }
});


/**
 * @swagger
 * /api/historial/animal/{id_animal}:
 *   get:
 *     summary: Obtener historial médico de un animal específico
 *     tags: [Historial]
 *     description: Retorna todos los registros del historial médico de un animal específico
 *     parameters:
 *       - in: path
 *         name: id_animal
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del animal
 *         example: 5
 *     responses:
 *       200:
 *         description: Historial del animal obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_historial:
 *                     type: integer
 *                     example: 1
 *                   id_animal:
 *                     type: integer
 *                     example: 5
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: "2025-12-01"
 *                   descripcion:
 *                     type: string
 *                     example: "Revisión general de salud"
 *                   tratamiento:
 *                     type: string
 *                     example: "Vacunación anual"
 *                   veterinario:
 *                     type: string
 *                     example: "Dr. González"
 *                   notas_adicionales:
 *                     type: string
 *                     example: "Animal en buen estado de salud"
 *       404:
 *         description: No se encontraron registros para este animal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No hay historial para este animal
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener el historial del animal
 */
// Obtener historial por ID del animal
router.get('/animal/:id_animal', async (req, res) => {
    const { id_animal } = req.params;
    try {
        const historial = await historialService.getHistorialPorAnimal(id_animal);
        if (historial && historial.length > 0) {
            res.json(historial);
        } else {
            res.status(404).json({ error: 'No hay historial para este animal' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el historial del animal' });
    }
});

/**
 * @swagger
 * /api/historial:
 *   post:
 *     summary: Crear un nuevo registro en el historial médico
 *     tags: [Historial]
 *     description: Crea un nuevo registro de historial médico para un animal específico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - animal_id
 *               - fecha
 *               - descripcion
 *               - tratamiento
 *               - veterinario
 *             properties:
 *               animal_id:
 *                 type: integer
 *                 description: ID del animal relacionado
 *                 example: 5
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha del registro médico
 *                 example: "2025-12-01"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del problema o revisión médica
 *                 example: "Revisión general de salud"
 *               tratamiento:
 *                 type: string
 *                 description: Tratamiento administrado o recomendado
 *                 example: "Vacunación anual"
 *               veterinario:
 *                 type: string
 *                 description: Nombre del veterinario responsable
 *                 example: "Dr. González"
 *               notas_adicionales:
 *                 type: string
 *                 description: Notas adicionales o observaciones
 *                 example: "Animal en buen estado de salud"
 *     responses:
 *       201:
 *         description: Registro de historial creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_historial:
 *                   type: integer
 *                   example: 10
 *                 id_animal:
 *                   type: integer
 *                   example: 5
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-01"
 *                 descripcion:
 *                   type: string
 *                   example: "Revisión general de salud"
 *                 tratamiento:
 *                   type: string
 *                   example: "Vacunación anual"
 *                 veterinario:
 *                   type: string
 *                   example: "Dr. González"
 *                 notas_adicionales:
 *                   type: string
 *                   example: "Animal en buen estado de salud"
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
 *                   example: Error al crear el historial
 */
// Crear un nuevo registro en el historial
router.post('/', verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO']), async (req, res) => {
    const nuevoHistorial = req.body;
    try {
        const resultado = await historialService.crearHistorial(nuevoHistorial);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el historial' });
    }
});

/**
 * @swagger
 * /api/historial/{id}:
 *   put:
 *     summary: Actualizar un registro del historial médico
 *     tags: [Historial]
 *     description: Actualiza la información de un registro específico del historial médico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               animal_id:
 *                 type: integer
 *                 description: ID del animal relacionado
 *                 example: 5
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Fecha del registro médico
 *                 example: "2025-12-05"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del problema o revisión médica
 *                 example: "Seguimiento post-vacunación"
 *               tratamiento:
 *                 type: string
 *                 description: Tratamiento administrado o recomendado
 *                 example: "Revisión de efectos secundarios"
 *               veterinario:
 *                 type: string
 *                 description: Nombre del veterinario responsable
 *                 example: "Dra. López"
 *               notas_adicionales:
 *                 type: string
 *                 description: Notas adicionales o observaciones
 *                 example: "Sin complicaciones observadas"
 *     responses:
 *       200:
 *         description: Registro de historial actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_historial:
 *                   type: integer
 *                   example: 1
 *                 id_animal:
 *                   type: integer
 *                   example: 5
 *                 fecha:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-05"
 *                 descripcion:
 *                   type: string
 *                   example: "Seguimiento post-vacunación"
 *                 tratamiento:
 *                   type: string
 *                   example: "Revisión de efectos secundarios"
 *                 veterinario:
 *                   type: string
 *                   example: "Dra. López"
 *                 notas_adicionales:
 *                   type: string
 *                   example: "Sin complicaciones observadas"
 *       404:
 *         description: Historial no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Historial no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al actualizar el historial
 */
// Actualizar un registro en el historial
router.put('/:id', verificarToken, rolMiddleware(['ADMIN','VOLUNTARIO']), async (req, res) => {
    const { id } = req.params;
    const historialActualizado = req.body;
    try {
        const resultado = await historialService.actualizarHistorial(id, historialActualizado);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el historial' });
    }
});

/**
 * @swagger
 * /api/historial/{id}:
 *   delete:
 *     summary: Eliminar un registro del historial médico
 *     tags: [Historial]
 *     description: Elimina permanentemente un registro del historial médico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del registro a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Registro del historial eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Historial eliminado correctamente
 *       404:
 *         description: Historial no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Historial no encontrado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al eliminar el historial
 */
// Eliminar un registro del historial
router.delete('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await historialService.eliminarHistorial(id);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el historial' });
    }
});

export default router;