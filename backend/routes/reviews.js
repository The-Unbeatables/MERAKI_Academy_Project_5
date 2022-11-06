const express = require('express')
const { addWorkerReview, updateReviewid, deleteReviewById, getAllreviews } = require('../controllers/reviews')
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")
const reviewsRouter =express.Router()

reviewsRouter.post('/', authentication, authorization("ADD_WORKER_REVIEW"), addWorkerReview)
reviewsRouter.put('/:id' , authentication, authorization("UPDATE_WORKER_REVIEW"), updateReviewid)
reviewsRouter.delete('/:id', authentication, authorization("DELETE_WORKER_REVIEW"), deleteReviewById)
reviewsRouter.get('/', getAllreviews)

module.exports = reviewsRouter

