import express, { type Application } from 'express'
import cors from 'cors'
import Diaries from './../routes/diaries.routes'
import Users from './../routes/users.routes'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger'
import { sequelize } from '../database/config'
import helmet from 'helmet'
import env from './callenv'
import { LogInfo } from '../utils/Loggers'
import { headerNoCache } from '../middlewares/authentication'

class Server {
  public app: Application
  public service: Application
  readonly pathV1 = '/api/v1'

  constructor() {
    this.app = express()
    this.service = this.app
    this.configuration()
    this.middlewares()
    this.swagger()
    this.routes()
  }

  configuration(): void {
    this.app.set('port', env.PORT)
    this.app.use(helmet())
    this.app.use(helmet.xssFilter())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.hidePoweredBy())
    this.app.use(helmet.frameguard({ action: 'deny' }))
    this.app.use(
      helmet.hsts({
        maxAge: 63072000,
        includeSubDomains: true,
        preload: true
      })
    )
    this.app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          frameAncestors: ["'none'"]
        }
      })
    )
  }

  middlewares(): void {
    this.app.use(cors())
    this.app.use(headerNoCache)
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  swagger(): void {
    this.app.use(
      '/docs',
      swaggerUI.serve,
      swaggerUI.setup(swaggerJSDoc(options))
    )
  }

  routes(): void {
    this.app.use(this.pathV1, Diaries)
    this.app.use(this.pathV1, Users)
  }

  listen(): void {
    this.app.listen(env.PORT, () => {
      LogInfo(`Server listening on http://127.0.0.1:${env.PORT}/docs`)
    })
  }

  getService(): Application {
    return this.service
  }

  async close(): Promise<void> {
    await sequelize.close()
  }
}

export const server = new Server()
