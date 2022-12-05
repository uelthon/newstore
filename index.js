import http from 'http'
import startDb from './utils/db.js'
import config from './utils/config.js'
import app from './app.js'

const server = http.createServer(app)

const start = () => {
  startDb()
  server.listen(config.PORT, () => {
    console.log(`server connected on ${config.PORT}`)
  })
}

start()
