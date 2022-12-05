import { Router } from 'express'
import Product from '../models/product.js'
import Order from '../models/order.js'
import Cart from '../models/cart.js'
import { filters } from '../utils/middle.js'
import mongoose from 'mongoose'

const router = Router()

router.get('/', filters, async (req, res) => {
  const {
    offset = 0,
    limit = 0,
    orderby = 'createdAt',
    dir = -1
  } = req.query
  const count = await Product.find({
    ...req.filters
  })
    .count()

  const products = await Product.find({
    ...req.filters
  })
    .limit(limit * 1)
    .skip(offset * 1)
    .sort({ [orderby]: dir })
  res.json({
    count,
    products
  })
})

router.get('/carts/:id', async (req, res) => {
  const carts = await Cart.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.id) } }
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
  res.json(carts)
})

router.get('/phone/:id', async (req, res) => {
  const phone = await Product.findById(req.params.id)
  res.json(phone)
})

router.get('/allorders', async (req, res) => {
  const { offset = 0, limit = 0 } = req.query
  const orders = await Order.find().limit(limit * 1).skip(offset * 1)
  res.json(orders)
})

router.get('/productstats', async (req, res) => {
  const orders = await Order.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 50 },
    {
      $unwind: '$products'
    }
  ]).group({
    _id: '$products.product',
    quantity: { $sum: '$products.quantity' }
  }).project({
    product: '$_id',
    quantity: '$quantity'
  }).sort({ quantity: -1 })
  res.json(orders)
})

router.get('/brandstats', async (req, res) => {
  const brands = await Order.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 50 },
    {
      $unwind: '$products'
    },
    {
      $lookup: {
        from: 'products',
        localField: 'products.product',
        foreignField: '_id',
        as: 'products.product'
      }
    }
  ]).project({
    name: 1,
    item: { $arrayElemAt: ['$products.product', 0] },
    quantity: '$products.quantity'
  }).group({
    _id: '$item.brand',
    quantity: { $sum: '$quantity' }
  }).project({
    brand: '$_id',
    quantity: '$quantity'
  }).sort({ quantity: -1 })
  res.json(brands)
})

router.get('/orders', async (req, res) => {
  const orders = await Order.aggregate([
    { $limit: 50 },
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $project: {
        user: { $arrayElemAt: ['$user', 0] },
        amount: '$amount'
      }
    },
    {
      $group: {
        _id: '$user.username',
        count: { $sum: 1 },
        total: { $sum: '$amount' }
      }
    }
  ]).sort({ count: -1 })
  res.json(orders)
})

router.get('/marcas', async (req, res) => {
  const marcas = await Product.aggregate([
    {
      $group: {
        _id: '$brand',
        count: { $sum: 1 }
      }
    }
  ]).project({
    brand: '$_id'
  }).sort({ brand: 1 })
  res.json(marcas)
})

router.get('/carts', async (req, res) => {
  const carts = await Cart.aggregate()
    .unwind('products')
    .lookup({
      from: 'products',
      localField: 'products.product',
      foreignField: '_id',
      as: 'products.product'
    })
    .group({
      _id: '$products.product.name',
      quantity: { $sum: '$products.quantity' }
    })
    .project({
      _id: { $arrayElemAt: ['$_id', 0] },
      quantity: '$quantity'
    })
    .sort({ quantity: -1 })
  res.json(carts)
})

router.get('/testcarts', async (req, res) => {
  const carts = await Order.aggregate().unwind('products').group({
    _id: '$products.product',
    quantity: { $sum: '$products.quantity' },
    show_on: { $sum: 1 }
  }).lookup({
    from: 'products',
    localField: '_id',
    foreignField: '_id',
    as: '_id'
  }).project({
    _id: { $arrayElemAt: ['$_id', 0] },
    quantity: '$quantity',
    show_on: '$show_on'
  }).project({
    _id: '$_id.name',
    quantity: '$quantity',
    show_on: '$show_on'
  }).sort({ quantity: -1 })

  res.json({
    count: carts.length,
    carts
  })
})

export default router
