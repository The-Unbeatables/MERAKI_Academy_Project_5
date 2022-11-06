const express = require('express');
const { addProductOrder } = require('../controllers/productsOrders');

const productOrderRouter = express.Router();

productOrderRouter.post('/', addProductOrder)

module.exports = productOrderRouter;