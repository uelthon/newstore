import { Router } from 'express'
import Order from '../models/order.js'
import User from '../models/user.js'
import { tokenExtractor, isAdmin } from '../utils/rolesmiddleware.js'

const router = Router()

router.get('/bestseller', async (req, res) => {
  const { limit = 8 } = req.query
  const orders = await Order.aggregate([
    { $sort: { createdAt: -1 } },
    { $limit: 50 },
    {
      $unwind: '$products'
    }
  ]).group({
    _id: '$products.product',
    quantity: { $sum: '$products.quantity' }
  }).lookup({
    from: 'products',
    localField: '_id',
    foreignField: '_id',
    as: 'product'
  }).project({
    name: { $arrayElemAt: ['$product.name', 0] },
    price: { $arrayElemAt: ['$product.price', 0] },
    img: { $arrayElemAt: ['$product.img', 0] },
    brand: { $arrayElemAt: ['$product.brand', 0] },
    quantity: '$quantity',
    id: { $arrayElemAt: ['$product._id', 0] }
  }).limit(limit * 1).sort({ quantity: -1 })
  res.json(orders)
})

router.get('/bestbrand', tokenExtractor, isAdmin, async (req, res) => {
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

router.get('/orderstats', tokenExtractor, isAdmin, async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
  const data = await Order.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' },
        sales: '$amount'
      }
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: '$sales' },
        count: { $sum: 1 }
      }
    }
  ]).sort({ _id: 1 })
  res.json(data)
})

router.get('/userstats', tokenExtractor, isAdmin, async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: '$createdAt' }
      }
    },
    {
      $group: {
        _id: '$month',
        total: { $sum: 1 }
      }
    }
  ]).sort({ _id: 1 })
  res.json(data)
})

export default router
