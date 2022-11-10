const express = require('express')
const { addServiceOrder, updateServiceOrder, deleteServiceOrder, getAllServiceOrders, getWorkerServiceOrders } = require('../controllers/serviceOrders')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")
const serviceOrderRouter= express.Router()

serviceOrderRouter.post('/', authentication, authorization("ADD_SERVICE_ORDER"), addServiceOrder)
serviceOrderRouter.put('/:id', authentication, authorization("UPDATE_SERVICE_ORDER"), updateServiceOrder)
serviceOrderRouter.delete('/:id' , authentication, authorization("DELETE_SERVICE_ORDER"), deleteServiceOrder)
serviceOrderRouter.get('/' , getAllServiceOrders)
serviceOrderRouter.get('/workerservis/worker/:id' , getWorkerServiceOrders)

module.exports= serviceOrderRouter

