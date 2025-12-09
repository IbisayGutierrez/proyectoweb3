import express from 'express';
import { rolMiddleware as checkRole } from '../middleware/rolMiddleware.js';
import { verificarToken as authenticateToken } from '../middleware/loginMiddleware.js';
import * as historialService from '../services/historialService.js';
import HistorialController from '../controllers/historialController.js';

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
 *                   diagnostico:
 *                     type: string
 *                     example: "Infección en la pata derecha"
 *                   tratamiento:
 *                     type: string
 *                     example: "Antibióticos por 7 días"
 *                   veterinario:
 *                     type: string
 *                     example: "Dr. González"
 *                   notas:
 *                     type: string
 *                     example: "Animal en buen estado de salud"
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
 *         description: Acceso prohibido - Rol insuficiente
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
 *                   example: "Error al obtener el historial"
 */
router.get('/', authenticateToken, checkRole(['ADMIN', 'VOLUNTARIO']), (req, res) => HistorialController.listar(req, res));

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
 *                 diagnostico:
 *                   type: string
 *                   example: "Infección en la pata derecha"
 *                 tratamiento:
 *                   type: string
 *                   example: "Antibióticos por 7 días"
 *                 veterinario:
 *                   type: string
 *                   example: "Dr. González"
 *                 notas:
 *                   type: string
 *                   example: "Animal en buen estado de salud"
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
 *         description: Acceso prohibido - Rol insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado"
 *       404:
 *         description: Historial no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Historial no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener el historial"
 */
router.get('/:id', authenticateToken, checkRole(['ADMIN', 'VOLUNTARIO']), (req, res) => HistorialController.obtenerPorId(req, res));

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
 *                   diagnostico:
 *                     type: string
 *                     example: "Infección en la pata derecha"
 *                   tratamiento:
 *                     type: string
 *                     example: "Antibióticos por 7 días"
 *                   veterinario:
 *                     type: string
 *                     example: "Dr. González"
 *                   notas:
 *                     type: string
 *                     example: "Animal en buen estado de salud"
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
 *         description: Acceso prohibido - Rol insuficiente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado"
 *       404:
 *         description: No se encontraron registros para este animal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No hay historial para este animal"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener el historial del animal"
 */
router.get('/animal/:id_animal', authenticateToken, checkRole(['ADMIN', 'VOLUNTARIO']), (req, res) => HistorialController.listarPorAnimal(req, res));

/**
 * @swagger
 * /api/historial:
 *   post:
 *     summary: Crear un nuevo registro en el historial médico
 *     tags: [Historial]
 *     description: Crea un nuevo registro de historial médico para un animal específico
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - animal_id
 *               - fecha
 *               - diagnostico
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
 *               diagnostico:
 *                 type: string
 *                 description: Diagnóstico médico del animal
 *                 example: "Infección en la pata derecha"
 *               tratamiento:
 *                 type: string
 *                 description: Tratamiento administrado o recomendado
 *                 example: "Antibióticos por 7 días"
 *               veterinario:
 *                 type: string
 *                 description: Nombre del veterinario responsable
 *                 example: "Dr. González"
 *               notas:
 *                 type: string
 *                 description: Notas adicionales u observaciones (opcional)
 *                 example: "Monitorear evolución de la infección"
 *     responses:
 *       201:
 *         description: Registro de historial creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Historial creado correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_historial:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Datos de entrada inválidos o incompletos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Datos incompletos o inválidos"
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
 *         description: Acceso denegado - Sin permisos suficientes
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
 *                   example: "Error al crear el historial"
 */
router.post('/', authenticateToken, checkRole(['ADMIN', 'VOLUNTARIO']), (req, res) => HistorialController.crear(req, res));

/**
 * @swagger
 * /api/historial/{id}:
 *   put:
 *     summary: Actualizar un registro del historial médico
 *     tags: [Historial]
 *     description: Actualiza la información de un registro específico del historial médico
 *     security:
 *       - bearerAuth: []
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
 *             required:
 *               - animal_id
 *               - fecha
 *               - diagnostico
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
 *                 example: "2025-12-05"
 *               diagnostico:
 *                 type: string
 *                 description: Diagnóstico médico del animal
 *                 example: "Seguimiento post-tratamiento"
 *               tratamiento:
 *                 type: string
 *                 description: Tratamiento administrado o recomendado
 *                 example: "Revisión de evolución"
 *               veterinario:
 *                 type: string
 *                 description: Nombre del veterinario responsable
 *                 example: "Dra. López"
 *               notas:
 *                 type: string
 *                 description: Notas adicionales u observaciones (opcional)
 *                 example: "Infección en recuperación"
 *     responses:
 *       200:
 *         description: Registro de historial actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Historial actualizado correctamente"
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
 *         description: Acceso denegado - Solo ADMIN puede actualizar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado"
 *       404:
 *         description: Historial no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Historial no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar el historial"
 */
router.put('/:id', authenticateToken, checkRole(['ADMIN']), (req, res) => HistorialController.actualizar(req, res));

/**
 * @swagger
 * /api/historial/{id}:
 *   delete:
 *     summary: Eliminar un registro del historial médico
 *     tags: [Historial]
 *     description: Elimina permanentemente un registro del historial médico
 *     security:
 *       - bearerAuth: []
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
 *                   example: "Historial eliminado correctamente"
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
 *         description: Acceso denegado - Solo ADMIN puede eliminar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado"
 *       404:
 *         description: Historial no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Historial no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al eliminar el historial"
 */
router.delete('/:id', authenticateToken, checkRole(['ADMIN']), (req, res) => HistorialController.eliminar(req, res));

export default router;