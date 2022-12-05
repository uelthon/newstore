import * as dotenv from 'dotenv'
dotenv.config()

const PSW_HASH = process.env.PSW_HASH
const JWT_SECRET = process.env.JWT_SECRET
const PORT = process.env.PORT || 3001
const MONGODB_URL = process.env.MONGODB_URL

export default {
  PORT,
  MONGODB_URL,
  PSW_HASH,
  JWT_SECRET
}
