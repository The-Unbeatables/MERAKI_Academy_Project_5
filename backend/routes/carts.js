const express = require("express");
const { showCart, addToCart, deleteCart, showCartById, deleteCartByUserId } = require("../controllers/carts");
const authentication = require("../middlewares/authentication");

const cartRouter = express.Router();

cartRouter.post('/', authentication, addToCart);
cartRouter.get('/show', authentication, showCart);
cartRouter.delete('/delete/:id', authentication, deleteCart);
cartRouter.get('/showcart/:id', authentication, showCartById);
cartRouter.delete('/delete/cart/:id', authentication, deleteCartByUserId);

module.exports = cartRouter;