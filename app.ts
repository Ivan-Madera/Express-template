import { server } from './src/config/server'
server.listen()
export const handler = server.app
