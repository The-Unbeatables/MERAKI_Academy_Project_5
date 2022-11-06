const express = require("express");
const { createNewComment, getAllComments, updateComment, deleteComment } = require("../controllers/comments");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")

const commentRouter = express.Router();

commentRouter.post('/:id', authentication, authorization("ADD_COMMENT"), createNewComment);
commentRouter.get('/:id', getAllComments);
commentRouter.put('/update/:id', authentication, authorization("UPDATE_COMMENT"), updateComment);
commentRouter.delete('/delete/:id', authentication, authorization("DELETE_COMMENT"), deleteComment);

module.exports = commentRouter;

