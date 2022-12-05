import { Router } from 'express'
import Cart from '../models/cart.js'
import mongoose from 'mongoose'
import { isAdmin, tokenExtractor, verfifyUserById } from '../utils/rolesmiddleware.js'

const router = Router()

router.get('/', tokenExtractor, isAdmin, async (req, res) => {
  const { offset = 0, limit = 10 } = req.query
  const carts = await Cart.find().limit(limit * 1).skip(offset * 1)
  res.json(carts)
})

router.get('/:id', tokenExtractor, verfifyUserById, async (req, res) => {
  const cart = await Cart.findOne({ user: req.params.id }).populate({
    path: 'products',
    populate: {
      path: 'product',
      select: 'name brand price img'
    }
  })
  res.json(cart)
})

router.get('/:id/total', tokenExtractor, verfifyUserById, async (req, res) => {
  const total = await Cart.aggregate([
    { $match: { user: mongoose.Types.ObjectId(req.params.id) } }
  ]).unwind('products').lookup({
    from: 'products',
    localField: 'products.product',
    foreignField: '_id',
    as: 'products.product'
  }).project({
    price: { $arrayElemAt: ['$products.product.price', 0] },
    quantity: '$products.quantity'
  }).group({
    _id: '$_id',
    total: { $sum: { $multiply: ['$price', '$quantity'] } }
  })
  res.json(total)
})

router.put('/:id', tokenExtractor, verfifyUserById, async (req, res) => {
  const body = req.body
  const id = req.params.id
  const cart = await Cart.findOneAndUpdate({ user: id }, body, { new: true })
  res.json(cart)
})

router.delete('/:id', tokenExtractor, verfifyUserById, async (req, res) => {
  const body = req.body
  const id = req.params.id
  const cart = await Cart.findOneAndUpdate({ user: id }, body, { new: true })
  res.json(cart)
})

export default router
