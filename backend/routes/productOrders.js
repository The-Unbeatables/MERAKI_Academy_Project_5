const express = require('express');
const { addProductOrder, deleteProductOrder, deleteAllUserProductOrders, getAllProductOrders, getUserProductOrders } = require('../controllers/productsOrders');

const productOrderRouter = express.Router();

productOrderRouter.post('/', addProductOrder)
productOrderRouter.delete('/:id', deleteProductOrder)
productOrderRouter.delete('/all/:id', deleteAllUserProductOrders)
productOrderRouter.get('/', getAllProductOrders)
productOrderRouter.get('/:id', getUserProductOrders)

module.exports = productOrderRouter;