const express = require('express')
const { addServiceOrder, updateServiceOrder } = require('../controllers/serviceOrders')

const serviceOrderRouter= express.Router()

serviceOrderRouter.post('/',addServiceOrder)
serviceOrderRouter.put('/:id',updateServiceOrder)

module.exports= serviceOrderRouter