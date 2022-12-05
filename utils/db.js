import mongoose from 'mongoose'
import config from './config.js'

const startDb = () => {
  console.log('mongoDB connecting...')
  mongoose.connect(config.MONGODB_URL)
    .then(console.log('mongoDB connected :)'))
    .catch((err) => console.log(err))
}

export default startDb
