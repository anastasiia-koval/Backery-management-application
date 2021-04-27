const mongoose = require('mongoose');
const dishSchema = mongoose.Schema({
    image: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
})

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
