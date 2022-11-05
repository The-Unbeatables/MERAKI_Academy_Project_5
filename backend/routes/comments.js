const express = require("express");
const { createNewComment, getAllComments, updateComment, deleteComment } = require("../controllers/comments");

const commentRouter = express.Router();

commentRouter.post('/:id', createNewComment);
commentRouter.get('/:id', getAllComments);
commentRouter.put('/update/:id', updateComment);
commentRouter.delete('/delete/:id', deleteComment);

module.exports = commentRouter;