import { Router } from 'express'
import { getUsers } from '../controllers/users.controller'
import { checkAuth } from '../middlewares/authentication'
const router = Router()

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener informacion de los usuarios
 *     description: Obtiene la información relevante de los usuarios.
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token de autenticacion
 *        type: string
 *     responses:
 *       200:
 *         description: Éxito. Devuelve la información de los usuarios.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/users', [checkAuth], getUsers)

export default router
