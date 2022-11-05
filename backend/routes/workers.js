const express = require('express')
const { updateWorkers, deleteWorkers, getWorkers } = require('../controllers/workers')

const workersRouter = express.Router()

workersRouter.put('/:id',updateWorkers)
workersRouter.delete('/:id',deleteWorkers)
workersRouter.get('/',getWorkers)

module.exports=workersRouter