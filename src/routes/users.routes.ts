import { Router } from 'express'
import {
  createUser,
  getUsers,
  updateUser
} from '../controllers/users.controller'
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
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/users', [checkAuth], getUsers)

/**
 * @swagger
 * /api/user:
 *   post:
 *     tags: [Users]
 *     summary: Crea unnuevo usario
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token de autenticacion
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellido_paterno:
 *                 type: string
 *               apellido_materno:
 *                 type: string
 *               usuario:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               correo:
 *                 type: string
 *               telefono:
 *                 type: string
 *               genero:
 *                 type: string
 *               estado_civil:
 *                 type: string
 *             required:
 *               - nombres
 *               - apellido_paterno
 *               - apellido_materno
 *               - usuario
 *               - contrasenia
 *               - correo
 *               - telefono
 *               - genero
 *               - estado_civil
 *     responses:
 *       200:
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/user', [checkAuth], createUser)

/**
 * @swagger
 * /api/user:
 *   patch:
 *     tags: [Users]
 *     summary: Crea unnuevo usario
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token de autenticacion
 *        type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               usuario:
 *                 type: string
 *             required:
 *               - nombres
 *               - usuario
 *     responses:
 *       200:
 *         description: Request exitoso.
 *       400:
 *          description: Ocurrio un error durante el proceso.
 *       401:
 *         description: No autorizado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/user', [checkAuth], updateUser)

export default router
