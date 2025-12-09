import express from 'express';
import AnimalesController from '../controllers/animalesController.js';
import { verificarToken } from '../middleware/loginMiddleware.js';
import { rolMiddleware } from '../middleware/rolMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/animales:
 *   get:
 *     summary: Obtener todos los animales activos
 *     tags: [Animales]
 *     description: Retorna la lista de animales activos con filtro opcional por estado
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [DISPONIBLE, ADOPTADO, EN_CUARENTENA, RESERVADO]
 *         description: Filtrar animales por estado
 *         example: "DISPONIBLE"
 *     responses:
 *       200:
 *         description: Animales obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error al obtener los animales
 */
router.get('/', (req, res) => AnimalesController.listar(req, res));

/**
 * @swagger
 * /api/animales/{id}:
 *   get:
 *     summary: Obtener un animal por ID
 *     tags: [Animales]
 *     description: Retorna un animal específico si está activo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del animal
 *         example: 1
 *     responses:
 *       200:
 *         description: Animal obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Animal no encontrado o inactivo
 *       500:
 *         description: Error al obtener el animal
 */
router.get('/:id', (req, res) => AnimalesController.obtenerPorId(req, res));

/**
 * @swagger
 * /api/animales/crear:
 *   post:
 *     summary: Crear un nuevo animal
 *     tags: [Animales]
 *     description: Crea un nuevo registro de animal (solo ADMIN)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - especie
 *               - estado
 *               - fecha_ingreso
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Luna"
 *               especie:
 *                 type: string
 *                 example: "Perro"
 *               raza:
 *                 type: string
 *                 example: "Labrador"
 *               edad:
 *                 type: string
 *                 example: "2 años"
 *               sexo:
 *                 type: string
 *                 example: "Hembra"
 *               descripcion:
 *                 type: string
 *                 example: "Sociable y juguetona"
 *               estado:
 *                 type: string
 *                 enum: [DISPONIBLE, ADOPTADO, EN_CUARENTENA, RESERVADO]
 *                 example: "DISPONIBLE"
 *               foto_url:
 *                 type: string
 *                 example: "https://ejemplo.com/foto.jpg"
 *               fecha_ingreso:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-10"
 *     responses:
 *       201:
 *         description: Animal creado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo ADMIN
 *       500:
 *         description: Error al crear el animal
 */
router.post('/crear', verificarToken, rolMiddleware(['ADMIN','VOLUNTARIO']), (req, res) => AnimalesController.crear(req, res));

/**
 * @swagger
 * /api/animales/{id}:
 *   put:
 *     summary: Actualizar un animal existente
 *     tags: [Animales]
 *     description: Actualiza la información de un animal (solo ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del animal
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
 *                 example: "Luna"
 *               especie:
 *                 type: string
 *                 example: "Perro"
 *               raza:
 *                 type: string
 *                 example: "Labrador"
 *               edad:
 *                 type: string
 *                 example: "3 años"
 *               sexo:
 *                 type: string
 *                 example: "Hembra"
 *               descripcion:
 *                 type: string
 *                 example: "Sociable y juguetona"
 *               estado:
 *                 type: string
 *                 enum: [DISPONIBLE, ADOPTADO, EN_CUARENTENA, RESERVADO]
 *                 example: "ADOPTADO"
 *               foto_url:
 *                 type: string
 *                 example: "https://ejemplo.com/foto.jpg"
 *               fecha_ingreso:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-10"
 *     responses:
 *       200:
 *         description: Animal actualizado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo ADMIN
 *       500:
 *         description: Error al actualizar el animal
 */
router.put('/:id', verificarToken, rolMiddleware(['ADMIN']), (req, res) => AnimalesController.actualizar(req, res));

/**
 * @swagger
 * /api/animales/{id}:
 *   delete:
 *     summary: Desactivar un animal (borrado lógico)
 *     tags: [Animales]
 *     description: Desactiva un animal sin eliminarlo de la BD (solo ADMIN)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del animal a desactivar
 *         example: 1
 *     responses:
 *       200:
 *         description: Animal desactivado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso denegado - Solo ADMIN
 *       500:
 *         description: Error al desactivar el animal
 */
router.delete('/:id', verificarToken, rolMiddleware(['ADMIN']), (req, res) => AnimalesController.desactivar(req, res));

export default router;
