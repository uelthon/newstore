import { Router } from 'express'
import User from '../models/user.js'
import Cart from '../models/cart.js'
import bcrypt from 'bcrypt'
import config from '../utils/config.js'
import { tokenExtractor, isAdmin, verfifyUserById } from '../utils/rolesmiddleware.js'

const router = Router()

router.get('/', tokenExtractor, isAdmin, async (req, res) => {
  const {
    offset = 0,
    limit = 5,
    orderby = 'createdAt',
    dir = -1,
    search = ''
  } = req.query
  const count = await User.find({
    ...(search.length > 0 ? { username: new RegExp(search.replace(/[^\w ]|_/gi, ''), 'i') } : null)
  }).count()
  const users = await User.find({
    ...(search.length > 0 ? { username: new RegExp(search.replace(/[^\w ]|_/gi, ''), 'i') } : null)
  })
    .limit(limit * 1)
    .skip(offset * 1)
    .sort({ [orderby]: dir })
  res.json({
    users,
    count
  })
})

router.get('/:id', tokenExtractor, verfifyUserById, async (req, res) => {
  const user = await User.findById(req.params.id).select(['username', 'address', 'isAdmin', 'cart']).populate({
    path: 'cart',
    select: 'user products'
  })

  res.json(user)
})

router.post('/', async (req, res) => {
  const { username, password, address } = req.body
  if (password.length < 6) {
    return res.status(400).json({ error: 'password must be at least 6 characters long' })
  }
  const passwordHash = await bcrypt.hash(password, Number(config.PSW_HASH))
  const newUser = {
    username,
    address,
    passwordHash
  }

  const user = await User.create(newUser)
  const cart = await Cart.create({ user: user._id })
  user.cart = cart._id
  await user.save()
  res.json(user)
})

router.put('/:id/status', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user.isAdmin) return res.status(400).json({ error: 'user admin cannot be disable' })
  user.disable = !user.disable
  await user.save()
  res.json(user)
})

router.put('/:id/admin', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user.username === 'ejuc95' || req.decodedToken.id === user.id || user.disable) return res.status(400).json({ error: 'Not Authorized' })
  user.isAdmin = !user.isAdmin
  await user.save()
  res.json(user)
})

router.put('/:id/update/user', tokenExtractor, verfifyUserById, async (req, res) => {
  const { username, address } = req.body
  if (!username && !address) return res.status(400).json({ error: 'Not allowed username or address' })
  const body = {
    ...(username ? { username } : null),
    ...(address ? { address } : null)
  }
  if (req.decodedToken.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  const user = await User.findByIdAndUpdate(req.params.id, body, { new: true })
  res.json(user)
})

router.put('/:id/update/password', tokenExtractor, verfifyUserById, async (req, res) => {
  const id = req.params.id
  const { currentpassword, newpassword } = req.body
  const user = await User.findById(id)
  const isPasswordValid = await bcrypt.compare(currentpassword, user.passwordHash)
  if (!isPasswordValid) {
    return res.status(400).json({ error: 'invalid password' })
  }
  const passwordHash = await bcrypt.hash(newpassword, Number(config.PSW_HASH))
  user.passwordHash = passwordHash
  await user.save()
  res.json(user)
})

export default router
