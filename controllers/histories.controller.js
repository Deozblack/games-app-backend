
const { response, request } = require('express');
const ProductHistory = require('../models/product-history');

const getHistories = async( req = request , res = response ) => {

    try {
         const { limit = 10, from = 0 } = req.query;
 
         const [ total, logs ] = await Promise.all([
            ProductHistory.countDocuments(),
            ProductHistory.find()
                .sort({ updatedAt: -1 })
                .skip( Number( from ) )
                .limit(Number( limit ))
        ]);
 
         res.status(200).json({
             total,
             logs
         });
    } catch (error) {
         res.status(500).json({
             message: 'An internal error occurred on the server. Please try again later.'
         })
    }
 
 }

module.exports = {
    getHistories
}
