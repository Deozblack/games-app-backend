const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    sku: {
        type: String,
        required: [true, 'SKUM is required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        default: 0
    },
    stock:{
        type: Number,
        default: 0
    },
    tag:{
        type: String,
        required: [true, 'Tag is required']
    },
    image: { 
        type: String 
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});


ProductSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Product', ProductSchema );
