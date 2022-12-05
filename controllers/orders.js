import { Router } from 'express'
import Order from '../models/order.js'
import { isAdmin, tokenExtractor, verfifyUserById, verifyUserByOrderId } from '../utils/rolesmiddleware.js'

const router = Router()

router.get('/', tokenExtractor, isAdmin, async (req, res) => {
  const { offset = 0, limit = 10, orderby = 'createdAt', dir = -1 } = req.query
  const count = await Order.find().count()
  const orders = await Order.find().populate({
    path: 'user',
    select: 'username id'
  }).limit(limit * 1)
    .skip(offset * 1)
    .sort({ [orderby]: dir })

  res.json({
    count,
    orders
  })
})

router.get('/order/:id', tokenExtractor, verifyUserByOrderId, async (req, res) => {
  res.json(req.order)
})

router.get('/:id', tokenExtractor, verfifyUserById, async (req, res) => {
  const {
    offset = 0,
    limit = 0,
    orderby = 'createdAt',
    dir = -1
  } = req.query
  const count = await Order.find({ user: req.params.id }).count()
  const orders = await Order.find({ user: req.params.id }).limit(limit * 1)
    .skip(offset * 1)
    .sort({ [orderby]: dir })
  res.json({
    count,
    orders
  })
})

router.post('/', tokenExtractor, async (req, res) => {
  const order = await Order.create(req.body)
  res.json(order)
})

export default router
