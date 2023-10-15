const { response } = require('express');
const Product = require('../models/product');
const ProductHistory = require('../models/product-history');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = [
    'products',
    'tags',
    'logs'
];

const searchProducts = async( term = '', res = response ) => {

    const mongoID = ObjectId.isValid( term );

    if ( mongoID ) {
        const product = await Product.findById(term);
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp(`\\b${term}`, 'i');
    const products = await Product.find({ name: regex, state: true })

    res.status(200).json({
        results: products
    });

}

const searchTags = async( term = '', res = response ) => {

    const regex = new RegExp(`\\b${term}`, 'i');
    const products = await Product.find({ tag: regex, state: true })

    res.status(200).json({
        results: products
    });

}

const searchHistories = async( term = '', res = response ) => {

    const mongoID = ObjectId.isValid( term );

    if ( mongoID ) {
        const productHistory = await ProductHistory.findById(term)
        return res.json({
            results: ( productHistory ) ? [ productHistory ] : []
        });
    }

    const regex = new RegExp(`\\b${term}`, 'i');
    const logs = await ProductHistory.find({ name: regex })

    res.status(200).json({
        results: logs
    });

}


const search = ( req, res = response ) => {
    
    const { collection, term  } = req.params;

    if ( !allowedCollections.includes( collection ) ) {
        return res.status(400).json({
            msg: `The allowed collections are: ${ allowedCollections }`
        })
    }

    switch (collection) {
        case 'products':
            searchProducts(term, res);
        break;

        case 'tags':
            searchTags(term, res);
        break;

        case 'logs':
            searchHistories(term, res);
        break;

        default:
            res.status(500).json({
                msg: 'Invalid search'
            })
    }

}



module.exports = {
    search
}