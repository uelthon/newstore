import jwt from 'jsonwebtoken'
import config from './config.js'
import Order from '../models/order.js'

export const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), config.JWT_SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

export const isAdmin = async (req, res, next) => {
  const user = req.decodedToken
  if (!user.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  next()
}

export const verfifyUserById = async (req, res, next) => {
  const user = req.decodedToken
  if (user.id !== req.params.id && !user.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  next()
}

export const verifyUserByOrderId = async (req, res, next) => {
  const user = req.decodedToken
  req.order = await Order.findById(req.params.id).populate({
    path: 'user',
    select: 'username'
  }).populate({
    path: 'products',
    populate: {
      path: 'product',
      select: 'name brand price img'
    }
  })
  if (req.order.user.id !== user.id && !user.isAdmin) return res.status(400).json({ error: 'Not Authorized' })
  next()
}
