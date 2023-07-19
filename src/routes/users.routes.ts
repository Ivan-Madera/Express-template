import { Router } from 'express'
import { getUsers } from '../controllers/users.controller'
const router = Router()

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener informacion de los usuarios
 *     description: Obtiene la información relevante de los usuarios.
 *     responses:
 *       200:
 *         description: Éxito. Devuelve la información de los usuarios.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/users', [], getUsers)

export default router
