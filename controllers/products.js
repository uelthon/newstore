import { Router } from 'express'
import Product from '../models/product.js'
import { tokenExtractor, isAdmin } from '../utils/rolesmiddleware.js'
import { filters } from '../utils/middle.js'

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

router.get('/autocomplete', async (req, res) => {
  const { search } = req.query
  if (!search) return res.status(400).json({ error: 'no found' })
  const cleanSearch = search.replace(/[^\w ]|_/gi, '')
  const regex = new RegExp(cleanSearch, 'i')
  const products = await Product.aggregate([
    { $match: { name: regex } }
  ]).project({
    label: '$name'
  })
  res.json(products)
})

router.get('/brands', async (req, res) => {
  const brands = await Product.aggregate([
    {
      $group: {
        _id: '$brand',
        count: { $sum: 1 }
      }
    }
  ]).project({
    brand: '$_id'
  }).sort({ brand: 1 })
  res.json(brands)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.json(product)
})

router.post('/', tokenExtractor, isAdmin, async (req, res) => {
  const body = req.body
  const product = await Product.create(body)
  res.json(product)
})

router.put('/:id', tokenExtractor, isAdmin, async (req, res) => {
  const id = req.params.id
  const body = req.body
  const product = await Product.findByIdAndUpdate(id, body, { new: true })
  res.json(product)
})

router.delete('/:id', tokenExtractor, isAdmin, async (req, res) => {
  await Product.findByIdAndRemove(req.params.id)
  res.status(200).end()
})

export default router
