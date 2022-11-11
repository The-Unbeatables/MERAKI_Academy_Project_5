const express = require('express')
const { addServiceOrder, updateServiceOrder, deleteServiceOrder, getAllServiceOrders, getWorkerServiceOrders, getUserServiceOrders } = require('../controllers/serviceOrders')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")
const serviceOrderRouter= express.Router()

serviceOrderRouter.post('/', authentication, authorization("ADD_SERVICE_ORDER"), addServiceOrder)
serviceOrderRouter.put('/:id', authentication, authorization("UPDATE_SERVICE_ORDER"), updateServiceOrder)
serviceOrderRouter.delete('/:id' , authentication, authorization("DELETE_SERVICE_ORDER"), deleteServiceOrder)
serviceOrderRouter.get('/' , getAllServiceOrders)
serviceOrderRouter.get('/workerservis/worker/:id' , getWorkerServiceOrders)
// serviceOrderRouter.get('/user/service/order/by/id/:id', getUserServiceOrders)
serviceOrderRouter.get('/user/:id', getUserServiceOrders)

module.exports= serviceOrderRouter

