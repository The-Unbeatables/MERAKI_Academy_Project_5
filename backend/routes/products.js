const express = require('express')
const {createNewProducts, getAllProducts, updateProductsById } = require('../controllers/products')

const productRouter = express.Router()

productRouter.post('/' ,createNewProducts)
productRouter.get('/',getAllProducts)
productRouter.put('/:id' , updateProductsById)

module.exports = productRouter