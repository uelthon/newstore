export const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('Query', request.query)
  console.log('---')
  next()
}

export const unknownEndpoint = (request, response, next) => {
  response.status(404).json({ error: 'unknown endpoint' })
  next()
}

export const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'username already exists' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }
  next(error)
}

export const filters = (req, res, next) => {
  const {
    brands = [],
    battery = 'all',
    ram = 'all',
    rom = 'all',
    price = 'all',
    size = 'all',
    search = '',
    products = []
  } = req.query

  req.filters = {
    ...(search.length > 0 ? { name: new RegExp(search.replace(/[^\w ]|_/gi, ''), 'i') } : null),
    ...(brands.length > 0 ? { brand: { $in: brands } } : null),
    ...(products.length > 0 ? { _id: { $in: products } } : null),
    ...(battery !== 'all' ? { battery: { $gte: battery } } : null),
    ...(ram !== 'all' ? { 'memory.ram': { $gte: ram } } : null),
    ...(rom !== 'all' ? { 'memory.rom': { $gte: rom } } : null),
    ...(price !== 'all' ? { price: { $lt: price } } : null),
    ...(size !== 'all' ? { 'display.size': { $lt: size } } : null)
  }
  next()
}
