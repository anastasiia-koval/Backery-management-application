const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  orderingDate: {
    type: Date
  },
  deliveryTime: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  apartament: {
    type: Number,
    required: true
  },
  floor:{
    type: Number
  },
  clientName: {
    type: String,
    required: true
  },
  clientSurname: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  discount: {
    type: String
  },
  totalPrice: {
    type: Number
  },
  dishesOrder:[
    { name: String ,quantity: Number}
  ],
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
