// src/controllers/cartController.js
const { addItemService, removeItemService, updateItemService, getCartService, initiatePaymentService, handleWebhookService } = require('../services/cartService');

const addItem = async (req, res) => {
  try {
    const cart = await addItemService(req.body);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeItem = async (req, res) => {
  try {
    const cart = await removeItemService(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const cart = await updateItemService(req.body);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await getCartService(req.params.userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const initiatePayment = async (req, res) => {
  try {
    const payment = await initiatePaymentService(req.body);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWebhook = async (req, res) => {
  try {
    await handleWebhookService(req.body);
    res.status(200).send('Webhook received');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addItem, removeItem, updateItem, getCart, initiatePayment, handleWebhook };
