const express = require("express");
const { showCart, addToCart, deleteCart, showCartById, deleteCartByUserId } = require("../controllers/carts");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization")

const cartRouter = express.Router();

cartRouter.post('/', authentication, authorization("ADD_CART"),  addToCart);
cartRouter.get('/show', authentication, showCart);
cartRouter.delete('/delete/:id', authentication, authorization("DELETE_CART"), deleteCart);
cartRouter.get('/showcart/:id', authentication, showCartById);
cartRouter.delete('/delete/cart/:id', authentication, authorization("DELETE_CART"), deleteCartByUserId);

module.exports = cartRouter;

