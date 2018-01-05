'user strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const columns = 'title image slug price description';
const ValidationContract = require('../validators/fluent-validator');

exports.get = (req, res, next) => {
    Product
        .find({}, columns)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(300).send(e);
        });
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({
            slug: req.params.slug,
            active: true,
        }, columns)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(300).send(e);
        });
}

exports.getById = (req, res, next) => {
    Product
        .findOne({
            _id: req.params.id
        })
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(300).send(e);
        });
}

exports.getByTag = (req, res, next) => {
    Product
        .find({
            tags: req.params.tag
        })
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(300).send(e);
        });
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'Invalid title len.');
    contract.hasMinLen(req.body.slug, 3, 'Invalid slug len.');
    contract.hasMinLen(req.body.description, 3, 'Invalid description len.');

    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;        
    }

    let product = new Product(req.body);
    // product.title = .req.body.title;
    product
        .save()
        .then(x => {
            res.status(201).send(product);
        }).catch(e => {
            res.status(300).send(e);
        });
}

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            tags: req.body.tags,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({});
    }).catch(e => {
        res.status(400).send({
            data: e
        })
    });
};

exports.delete = (req, res, next) => {
    Product.findOneAndRemove(req.params.id)
        .then(x => {
            res.status(200).send({});
        }).catch(e => {
            res.status(400).send({
                data: e
            })
        });
};