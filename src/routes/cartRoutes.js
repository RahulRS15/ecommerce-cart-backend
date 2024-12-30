// src/routes/cartRoutes.js
const express = require('express');
const { addItem, removeItem, updateItem, getCart, initiatePayment, handleWebhook } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addItem);
router.delete('/remove', removeItem);
router.put('/update', updateItem);
router.get('/:userId', getCart);
router.post('/payment', initiatePayment);
router.post('/webhook', handleWebhook);

module.exports = router;
