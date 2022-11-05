const express = require('express')
const { addWorkerReview, updateReviewid, deleteReviewById, getAllreviews } = require('../controllers/reviews')

const reviewsRouter =express.Router()

reviewsRouter.post('/', addWorkerReview)
reviewsRouter.put('/:id' , updateReviewid)
reviewsRouter.delete('/:id',deleteReviewById)
reviewsRouter.get('/', getAllreviews)

module.exports = reviewsRouter