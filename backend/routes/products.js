const express = require('express')
const {createNewProducts, getAllProducts } = require('../controllers/products')

const productRouter = express.Router()

productRouter.post('/' ,createNewProducts)
productRouter.get('/',getAllProducts)

module.exports = productRouter