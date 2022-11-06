const express = require('express');
const { addProductOrder, deleteProductOrder, deleteAllUserProductOrders } = require('../controllers/productsOrders');

const productOrderRouter = express.Router();

productOrderRouter.post('/', addProductOrder)
productOrderRouter.delete('/:id', deleteProductOrder)
productOrderRouter.delete('/all/:id', deleteAllUserProductOrders)

module.exports = productOrderRouter;