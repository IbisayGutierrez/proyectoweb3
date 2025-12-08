import express from 'express';
import * as tareasService from '../services/tareasService.js';
import { verificarToken } from '../middleware/loginMiddleware.js';
import { rolMiddleware } from '../middleware/rolMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/tareas:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     description: Retorna la lista completa de tareas o filtra por estado si se proporciona
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [pendiente, en progreso, completada]
 *         description: Filtrar tareas por estado
 *         example: "pendiente"
 *     responses:
 *       200:
 *         description: Tareas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tarea:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Alimentar a los animales"
 *                   descripcion:
 *                     type: string
 *                     example: "Dar comida a todos los perros del refugio"
 *                   estado:
 *                     type: string
 *                     example: "pendiente"
 *                   prioridad:
 *                     type: string
 *                     example: "alta"
 *                   fecha_creacion:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-12-05T10:30:00Z"
 *                   fecha_limite:
 *                     type: string
 *                     format: date
 *                     example: "2025-12-10"
 *                   id_voluntario:
 *                     type: integer
 *                     example: 3
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token no proporcionado
 *       403:
 *         description: Acceso prohibido - Rol insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener las tareas
 */
router.get('/', [verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO'])], async (req, res) => {
    try {
        const estado = req.query.estado;
        let tareas;
        if (estado) {
            tareas = await tareasService.getTareaPorEstado(estado);
        } else {
            tareas = await tareasService.getTareas();
        }
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/tareas/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     description: Retorna una tarea específica por su ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarea obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_tarea:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "Alimentar a los animales"
 *                 descripcion:
 *                   type: string
 *                   example: "Dar comida a todos los perros del refugio"
 *                 estado:
 *                   type: string
 *                   example: "pendiente"
 *                 prioridad:
 *                   type: string
 *                   example: "alta"
 *                 fecha_creacion:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-12-05T10:30:00Z"
 *                 fecha_limite:
 *                   type: string
 *                   format: date
 *                   example: "2025-12-10"
 *                 id_voluntario:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token no proporcionado
 *       403:
 *         description: Acceso prohibido - Rol insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Tarea no encontrada
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener la tarea
 */
router.get('/:id', [verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO'])], async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await tareasService.getTareaPorId(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json(tarea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/tareas/voluntario/{id}:
 *   get:
 *     summary: Obtener tareas por voluntario
 *     tags: [Tareas]
 *     description: Retorna todas las tareas asignadas a un voluntario específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del voluntario
 *         example: 3
 *     responses:
 *       200:
 *         description: Tareas del voluntario obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_tarea:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Alimentar a los animales"
 *                   descripcion:
 *                     type: string
 *                     example: "Dar comida a todos los perros del refugio"
 *                   estado:
 *                     type: string
 *                     example: "en progreso"
 *                   prioridad:
 *                     type: string
 *                     example: "alta"
 *                   fecha_creacion:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-12-05T10:30:00Z"
 *                   fecha_limite:
 *                     type: string
 *                     format: date
 *                     example: "2025-12-10"
 *                   id_voluntario:
 *                     type: integer
 *                     example: 3
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token no proporcionado
 *       403:
 *         description: Acceso prohibido - Rol insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al obtener las tareas
 */
router.get('/voluntario/:id', verificarToken, rolMiddleware(['ADMIN', 'VOLUNTARIO']), async (req, res) => {
    const { id } = req.params;
    try {
        const tareas = await tareasService.getTareasPorVoluntario(id);
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/tareas:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     description: Crea una nueva tarea y la asigna a un voluntario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - estado
 *               - prioridad
 *               - fecha_limite
 *               - id_voluntario
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Alimentar a los animales"
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada de la tarea
 *                 example: "Dar comida a todos los perros del refugio"
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en progreso, completada]
 *                 description: Estado de la tarea
 *                 example: "pendiente"
 *               prioridad:
 *                 type: string
 *                 enum: [baja, media, alta]
 *                 description: Prioridad de la tarea
 *                 example: "alta"
 *               fecha_limite:
 *                 type: string
 *                 format: date
 *                 description: Fecha límite de vencimiento de la tarea
 *                 example: "2025-12-10"
 *               id_voluntario:
 *                 type: integer
 *                 description: ID del voluntario asignado
 *                 example: 3
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea creada correctamente"
 *                 id_tarea:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se pudo crear la tarea"
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token no proporcionado o inválido"
 *       403:
 *         description: Acceso prohibido - Solo administradores pueden crear tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear la tarea"
 */
router.post('/', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
    try {
        const nuevaTarea = req.body;
        const resultado = await tareasService.crearTarea(nuevaTarea);
        if (!resultado || resultado.affectedRows === 0) {
            return res.status(400).json({ error: 'No se pudo crear la tarea' });
        }
        res.status(201).json({ message: 'Tarea creada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/tareas/{id}:
 *   put:
 *     summary: Actualizar una tarea existente
 *     tags: [Tareas]
 *     description: Actualiza la información de una tarea específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a actualizar
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_voluntario
 *               - titulo
 *               - descripcion
 *               - estado
 *               - prioridad
 *               - fecha_limite
 *             properties:
 *               id_voluntario:
 *                 type: integer
 *                 description: ID del voluntario asignado
 *                 example: 3
 *               titulo:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Alimentar a los animales - Actualizado"
 *               descripcion:
 *                 type: string
 *                 description: Descripción detallada de la tarea
 *                 example: "Dar comida a todos los perros y gatos del refugio"
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en progreso, completada]
 *                 description: Estado actual de la tarea
 *                 example: "en progreso"
 *               prioridad:
 *                 type: string
 *                 enum: [baja, media, alta]
 *                 description: Prioridad de la tarea
 *                 example: "media"
 *               fecha_limite:
 *                 type: string
 *                 format: date
 *                 description: Fecha límite de vencimiento de la tarea
 *                 example: "2025-12-15"
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea actualizada correctamente"
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token no proporcionado o inválido"
 *       403:
 *         description: Acceso prohibido - Solo administradores pueden actualizar tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tarea no encontrada"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar la tarea"
 */
router.put('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
    const { id } = req.params;
    try {
        const tareaActualizada = req.body;
        const resultado = await tareasService.actualizarTarea(id, tareaActualizada);
        if (!resultado || resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/tareas/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     description: Elimina permanentemente una tarea específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tarea a eliminar
 *         example: 1
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea eliminada correctamente"
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token no proporcionado o inválido"
 *       403:
 *         description: Acceso prohibido - Solo administradores pueden eliminar tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tarea no encontrada"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al eliminar la tarea"
 */
router.delete('/:id', verificarToken, rolMiddleware(['ADMIN']), async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await tareasService.eliminarTarea(id);
        if (!resultado || resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;