import dotenv from 'dotenv'
import Joi from 'joi'
dotenv.config()

interface IEnv {
  ENV: string
  PORT: number
  DB_DATABASE: string
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_HOST: string
  DB_PORT: number
  TOKEN: string
  SECRET_KEY: string
}

const schema = Joi.object({
  ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  DB_DATABASE: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  TOKEN: Joi.string().required(),
  SECRET_KEY: Joi.string().required()
})
  .unknown()
  .required()

const { error, value: env } = schema.validate(process.env)

if (error) {
  throw new Error(
    `Error en la configuración de las variables de entorno: ${error.message}`
  )
}

export default env as IEnv
