const express = require("express");
const { showCart, addToCart, deleteCart, showCartById, deleteCartByUserId } = require("../controllers/carts");

const cartRouter = express.Router();

cartRouter.post('/', addToCart);
cartRouter.get('/show', showCart);
cartRouter.delete('/delete/:id', deleteCart);
cartRouter.get('/showcart/:id', showCartById);
cartRouter.delete('/delete/cart/:id', deleteCartByUserId);

module.exports = cartRouter;