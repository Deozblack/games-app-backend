const { response, request } = require('express');
const Product = require('../models/product');
const ProductHistory = require('../models/product-history');

const getProducts = async( req = request , res = response ) => {

   try {
        const { limit = 100, from = 0 } = req.query;
        const query = { state: true };

        const [ total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query).sort({ updatedAt: -1 }).skip(Number( from )).limit(Number( limit ))
        ]);

        res.status(200).json({
            total,
            products
        });
   } catch (error) {
        res.status(500).json({
            message: 'An internal error occurred on the server. Please try again later.'
        })
   }

}

const getProductById = async( req = request , res = response ) => {

    try {
        const { id } = req.params;
        const product = await Product.findById( id )
    
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'An internal error occurred on the server. Please try again later.'
        })
    }


}

const createProduct = async( req = request , res = response ) => {

    try {
        const { state , sku , ...body } = req.body;

        const dbProduct = await Product.findOne({ sku });
        if ( dbProduct ) {
            return res.status(409).json({
                mesage: `The product already exists in the system.`
            });
        }

        const product = new Product( req.body );
    
        await product.save();
    
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'An internal error occurred on the server. Please try again later.'
        })
    }

}

const updateProduct = async( req = request , res = response ) => {

    try {
        const { id } = req.params;
        const { state , ...body } = req.body;

        const dbProduct = await Product.findOne({sku: body.sku});
        const dbId = await Product.findById(id);

        if (dbProduct && dbProduct._id != id) {
            return res.status(409).json({
                mesage: `The product already exists in the system.`
            });
        }

        // Obtén el producto actual antes de actualizarlo
        const existingProduct = await Product.findById(id);

        // Crea un registro en ProductHistory para capturar los cambios
        await ProductHistory.create({
            productId: existingProduct._id,
            name: existingProduct.name,
            image: existingProduct.image,
            price: existingProduct.price,
            stock: existingProduct.stock
        });

    
        const product = await Product.findByIdAndUpdate(id, body, { new: true });
    
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'An internal error occurred on the server. Please try again later.'
        })
    }

}

const deleteProductById = async( req = request , res = response ) => {

    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate( id, { state: false }, {new: true });
    
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({
            message: 'An internal error occurred on the server. Please try again later.'
        })
    }
}




module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProductById
}