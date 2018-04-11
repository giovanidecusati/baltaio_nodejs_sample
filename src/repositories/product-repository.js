'user strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const columns = 'title image slug price description'

exports.get = () => {
  return Product.find({}, columns)
}

exports.getBySlug = slug => {
  return Product.findOne(
    {
      slug: slug,
      active: true
    },
    columns
  )
}

exports.getById = id => {
  return Product.findOne({
    _id: id
  })
}

exports.getByTag = tag => {
  return Product.find({
    tags: tag
  })
}

exports.create = data => {
  let product = new Product(data)
  // product.title = .req.body.title
  return product.save()
}

exports.update = (id, data) => {
  return Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      image: data.image,
      tags: data.tags,
      slug: data.slug
    }
  })
}

exports.delete = id => {
  return Product.findOneAndRemove({
    _id: id
  })
}
