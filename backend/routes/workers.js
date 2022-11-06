const express = require('express')
const { updateWorkers, deleteWorkers, getWorkers } = require('../controllers/workers')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")
const workersRouter = express.Router()

workersRouter.put('/:id', authentication, authorization("UPDATE_WORKER"), updateWorkers)
workersRouter.delete('/:id', authentication, authorization("DELETE_WORKER"), deleteWorkers)
workersRouter.get('/',  authentication, authorization("GET_ALL_WORKERS"), getWorkers)

module.exports=workersRouter
