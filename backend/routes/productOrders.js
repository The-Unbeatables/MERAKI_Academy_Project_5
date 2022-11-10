const express = require('express');
const { addProductOrder, deleteProductOrder, deleteAllUserProductOrders, getAllProductOrders, getUserProductOrders, updateProductOrder } = require('../controllers/productsOrders');
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")
const productOrderRouter = express.Router();

productOrderRouter.post('/', authentication, authorization("ADD_PRODUCT_ORDER"),  addProductOrder)
productOrderRouter.delete('/delete/:id', authentication, authorization("DELETE_PRODUCT_ORDER"), deleteProductOrder) 
productOrderRouter.delete('/all/:id',  authentication, authorization("DELETE_PRODUCT_ORDER"), deleteAllUserProductOrders)
productOrderRouter.get('/', getAllProductOrders)
productOrderRouter.get('/showCart', authentication, getUserProductOrders)
productOrderRouter.put('/:id', authentication, authorization("UPDATE_PRODUCT_ORDER"), updateProductOrder)

module.exports = productOrderRouter;

