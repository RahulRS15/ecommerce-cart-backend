// src/models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      productId: String,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  status: String,
});

module.exports = mongoose.model('Order', orderSchema);
