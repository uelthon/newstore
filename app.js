import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import productsRouter from './controllers/products.js'
import cartsRouter from './controllers/carts.js'
import orderService from './controllers/orders.js'
import paymentService from './controllers/payments.js'
import statsRouter from './controllers/stats.js'
import testRouter from './controllers/test.js'
import { errorHandler, unknownEndpoint, requestLogger } from './utils/middle.js'
import path from 'path'
const __dirname = path.resolve()

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/orders', orderService)
app.use('/api/payments', paymentService)
app.use('/api/stats', statsRouter)
app.use('/api/test', testRouter)

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
