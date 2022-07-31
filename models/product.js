const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = schema({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['computers', 'phones', 'accesories'] },
    description: String
})

// Export model
module.exports = mongoose.model('Product', productSchema);
