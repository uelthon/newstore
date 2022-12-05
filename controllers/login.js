import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (!user) {
    return res.status(400).json({ error: 'invalid user or password' })
  }

  if (user.disable) return res.status(400).json({ error: 'disabled user' })

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'invalid user or password' })
  }

  const token = jwt.sign({
    id: user._id,
    username: user.username,
    address: user.address,
    isAdmin: user.isAdmin
  }, config.JWT_SECRET)

  res.json({
    id: user._id,
    username: user.username,
    address: user.address,
    isAdmin: user.isAdmin,
    token
  })
})

export default router
