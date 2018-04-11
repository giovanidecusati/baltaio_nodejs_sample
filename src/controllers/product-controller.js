'user strict'

const ValidationContract = require('../validators/fluent-validator')
const productRepository = require('../repositories/product-repository')

exports.get = async (req, res, next) => {
  var data = await productRepository.get()
  res.status(200).send(data)
}

exports.getBySlug = async (req, res, next) => {
  var data = await productRepository.getBySlug(req.params.slug)
  res.status(200).send(data)
}

exports.getById = async (req, res, next) => {
  var data = await productRepository.getById(req.params.id)
  res.status(200).send(data)
}

exports.getByTag = async (req, res, next) => {
  var data = await productRepository.getByTag(req.params.tag)
  res.status(200).send(data)
}

exports.post = (req, res, next) => {
  let contract = new ValidationContract()
  contract.hasMinLen(req.body.title, 3, 'Invalid title len.')
  contract.hasMinLen(req.body.slug, 3, 'Invalid slug len.')
  contract.hasMinLen(req.body.description, 3, 'Invalid description len.')
  contract.isGtOrEquals(req.body.price, 0.01, 'Invalid price.')

  if (!contract.isValid()) {
    res
      .status(400)
      .send(contract.errors())
      .end()
    return
  }

  productRepository
    .create(req.body)
    .then(x => {
      res.status(201).send(x)
    })
    .catch(e => {
      res.status(400).send(e)
    })
}

exports.put = (req, res, next) => {
  productRepository
    .update(req.params.id, req.body)
    .then(x => {
      res.status(200).send({})
    })
    .catch(e => {
      res.status(400).send({
        data: e
      })
    })
}

exports.delete = (req, res, next) => {
  productRepository
    .delete(req.params.id)
    .then(x => {
      res.status(200).send({})
    })
    .catch(e => {
      res.status(400).send({
        data: e
      })
    })
}
