'user strict'
const ValidationContract = require('../validators/fluent-validator')
const productRepository = require('../repositories/product-repository')

exports.get = (req, res, next) => {
  productRepository
    .get()
    .then(data => {
      res.status(200).send(data)
    })
    .catch(e => {
      res.status(400).send(e)
    })
}

exports.getBySlug = (req, res, next) => {
  productRepository
    .getBySlug(req.params.slug)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(e => {
      res.status(400).send(e)
    })
}

exports.getById = (req, res, next) => {
  return productRepository
    .getById(req.params.id)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(e => {
      res.status(400).send(e)
    })
}

exports.getByTag = (req, res, next) => {
  return productRepository
    .getByTag(req.params.tag)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(e => {
      res.status(400).send(e)
    })
}

exports.post = (req, res, next) => {
  let contract = new ValidationContract()
  contract.hasMinLen(req.body.title, 3, 'Invalid title len.')
  contract.hasMinLen(req.body.slug, 3, 'Invalid slug len.')
  contract.hasMinLen(req.body.description, 3, 'Invalid description len.')

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
