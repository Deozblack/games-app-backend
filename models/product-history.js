const { Schema, model } = require('mongoose');

const ProductHistorySchema = Schema({
    productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

ProductHistorySchema.methods.toJSON = function() {
    const { __v , ...data  } = this.toObject();
    return data;
}

module.exports = model( 'ProductHistory', ProductHistorySchema );
