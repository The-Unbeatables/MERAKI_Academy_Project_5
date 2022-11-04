const express = require('express')
const {createNewProducts, getAllProducts, updateProductsById, deleteProductsById } = require('../controllers/products')

const productRouter = express.Router()

productRouter.post('/' ,createNewProducts)
productRouter.get('/',getAllProducts)
productRouter.put('/:id' , updateProductsById)
productRouter.delete('/:id' , deleteProductsById)

module.exports = productRouter