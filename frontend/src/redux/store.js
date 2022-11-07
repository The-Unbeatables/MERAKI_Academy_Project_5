import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import cartsReducer from "./reducers/carts";
import commentsReducer from "./reducers/comments";
import productOrdersReducer from "./reducers/product_orders";
import productsReducer from "./reducers/products";
import reviewsReducer from "./reducers/reviews";
import serviceOrdersReducer from "./reducers/service_orders";
import workersReducer from "./reducers/workers";

export default configureStore({
    reducer:{
        auth: authReducer,
        carts: cartsReducer,
        comments: commentsReducer,
        productOrders: productOrdersReducer,
        products: productsReducer,
        reviews: reviewsReducer,
        serviceOrders: serviceOrdersReducer,
        workers: workersReducer
    }
})