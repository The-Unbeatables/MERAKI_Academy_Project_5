const express = require('express')
const {createNewProducts, getAllProducts, updateProductsById, deleteProductsById, searchProductsByTitle, getAllProductsbyCategory, filterProduct } = require('../controllers/products')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")
const productRouter = express.Router()

productRouter.post('/' , authentication, authorization("ADD_PRODUCT"), createNewProducts)
productRouter.get('/',getAllProducts)
productRouter.put('/:id' , authentication, authorization("UPDATE_PRODUCT"),  updateProductsById)
productRouter.delete('/:id' , authentication, authorization("DELETE_PRODUCT"), deleteProductsById)
productRouter.get("/search/product" , searchProductsByTitle )
productRouter.get('/:category', getAllProductsbyCategory)
productRouter.post('/filter/Product',filterProduct)

module.exports = productRouter

