const express = require('express')
const {createNewProducts, getAllProducts, updateProductsById, deleteProductsById, searchProductsByTitle, getAllProductsbyCategory, filterProduct, paginationProduct } = require('../controllers/products')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")
const productRouter = express.Router()

productRouter.post('/' , /*authentication, authorization("ADD_PRODUCT"),*/ createNewProducts)
productRouter.get('/',getAllProducts)
productRouter.put('/:id' , authentication, authorization("UPDATE_PRODUCT"),  updateProductsById)
productRouter.delete('/delete/product/:id', deleteProductsById)
productRouter.get("/search/product" , searchProductsByTitle )
productRouter.get('/:category', getAllProductsbyCategory)
productRouter.post('/filter/Product',filterProduct)
productRouter.get('/pagination/product/:id', paginationProduct)

module.exports = productRouter

