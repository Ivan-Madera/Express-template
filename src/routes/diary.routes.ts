import { Router } from 'express'
import { diaries, diariesCreate } from '../controllers/diary.controller'
import { diariesCreateValidator } from '../validators/diary.validator'
const router = Router()

/**
 * @swagger
 * /api/v1/diaries:
 *   get:
 *     tags: ["[V1] Diaries"]
 *     summary: Obtener informacion de los viajes
 *     description: Obtiene la información relevante de los viajes.
 *     responses:
 *       200:
 *         description: Éxito. Devuelve la información de los viajes.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/diaries', [], diaries)

/**
 * @swagger
 * /api/v1/diaries:
 *   post:
 *     tags: ["[V1] Diaries"]
 *     summary: Crea una nuevo diario de viaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               weather:
 *                 type: string
 *               visibility:
 *                 type: string
 *               comment:
 *                 type: string
 *             required:
 *               - date
 *               - weather
 *               - visibility
 *               - comment
 *     responses:
 *       200:
 *         description: Creacion de la entrada exitosa
 *       500:
 *         description: Mensaje de error
 */
router.post('/diaries', [...diariesCreateValidator], diariesCreate)

export { router as Diaries }
