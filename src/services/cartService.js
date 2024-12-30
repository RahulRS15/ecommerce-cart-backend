// src/services/cartService.js
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const axios = require('axios');

const addItemService = async (data) => {
  const cart = await Cart.findOne({ userId: data.userId });
  if (cart) {
    cart.items.push({ productId: data.productId, quantity: data.quantity });
    await cart.save();
  } else {
    const newCart = new Cart({ userId: data.userId, items: [{ productId: data.productId, quantity: data.quantity }] });
    await newCart.save();
  }
  return cart;
};

const removeItemService = async (data) => {
  const cart = await Cart.findOne({ userId: data.userId });
  if (cart) {
    cart.items = cart.items.filter(item => item.productId !== data.productId);
    await cart.save();
  }
  return cart;
};

const updateItemService = async (data) => {
  const cart = await Cart.findOne({ userId: data.userId });
  if (cart) {
    const item = cart.items.find(item => item.productId === data.productId);
    if (item) {
      item.quantity = data.quantity;
      await cart.save();
    }
  }
  return cart;
};

const getCartService = async (userId) => {
  const cart = await Cart.findOne({ userId });
  return cart;
};

const initiatePaymentService = async (data) => {
  const order = new Order({ userId: data.userId, items: data.items, totalAmount: data.totalAmount, status: 'Pending' });
  await order.save();

  const response = await axios.post('https://api.cashfree.com/api/v1/order/create', {
    orderId: order._id,
    orderAmount: data.totalAmount,
    orderCurrency: 'INR',
    customerEmail: data.email,
    customerPhone: data.phone,
  }, {
    headers: { 'Authorization': `Bearer ${process.env.CASHFREE_API_KEY}` }
  });

  return response.data;
};

const handleWebhookService = async (data) => {
  const order = await Order.findById(data.orderId);
  if (order) {
    order.status = data.txStatus === 'SUCCESS' ? 'Completed' : 'Failed';
    await order.save();
  }
};

module.exports = { addItemService, removeItemService, updateItemService, getCartService, initiatePaymentService, handleWebhookService };
