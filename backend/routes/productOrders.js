const express = require('express');
const { addProductOrder, deleteProductOrder } = require('../controllers/productsOrders');

const productOrderRouter = express.Router();

productOrderRouter.post('/', addProductOrder)
productOrderRouter.delete('/:id', deleteProductOrder)

module.exports = productOrderRouter;