import { Sequelize } from 'sequelize'
import env from '../config/callenv'

const DB_PORT = env.DB_PORT

export const sequelize = new Sequelize(
  env.DB_DATABASE,
  env.DB_USERNAME,
  env.DB_PASSWORD,
  {
    host: `${env.DB_HOST}`,
    port: DB_PORT,
    dialect: 'mysql',
    logging: console.log
  }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexion exitosa')
  })
  .catch((error) => {
    console.log('Conexion fallida:', error)
  })
