import { Router } from 'express'
import {
  createUser,
  getAccessToken,
  getUsers,
  updateUser
} from '../controllers/users.controller'
import {
  checkAuth,
  checkBearer
} from '../middlewares/authentication.middleware'

const router = Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/v1/accesstoken:
 *   get:
 *     tags: ["[V1] Users"]
 *     summary: Obtener el accesstoken
 *     description: Obtiene el accesstoken para los endpoint.
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
router.get('/accesstoken', [], getAccessToken)

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags: ["[V1] Users"]
 *     security:
 *     - bearerAuth: []
 *     summary: Obtener informacion de los usuarios
 *     description: Obtiene la información relevante de los usuarios.
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        description: Bearer token de autenticacion
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
router.get('/users', [checkBearer], getUsers)

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     tags: ["[V1] Users"]
 *     summary: Crea un nuevo usuario
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
 * /api/v1/user:
 *   patch:
 *     tags: ["[V1] Users"]
 *     summary: Actualiza un usuario existente
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

export { router as Users }
