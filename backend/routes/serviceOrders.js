const express = require('express')
const { addServiceOrder, updateServiceOrder, deleteServiceOrder, getAllServiceOrders } = require('../controllers/serviceOrders')

const serviceOrderRouter= express.Router()

serviceOrderRouter.post('/',addServiceOrder)
serviceOrderRouter.put('/:id',updateServiceOrder)
serviceOrderRouter.delete('/:id' , deleteServiceOrder)
serviceOrderRouter.get('/' , getAllServiceOrders)

module.exports= serviceOrderRouter