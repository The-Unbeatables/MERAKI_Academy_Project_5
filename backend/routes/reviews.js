const express = require('express')
const { addWorkerReview, updateReviewid } = require('../controllers/reviews')

const reviewsRouter =express.Router()

reviewsRouter.post('/', addWorkerReview)
reviewsRouter.put('/:id' , updateReviewid)

module.exports = reviewsRouter