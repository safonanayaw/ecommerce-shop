import express from "express"

import adminAuth from "../middleware/adminAuth.js"
import userAuth from "../middleware/auth.js"

import {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe} from "../controllers/orderController.js"

const orderRouter = express.Router()

// admin- list all orders
orderRouter.post('/list', adminAuth, allOrders)
// admin- update order status
orderRouter.post('/status', adminAuth, updateStatus)


// payment features
// cod enpoint
orderRouter.post("/place",userAuth, placeOrder)
// stripe enpoint
orderRouter.post("/stripe",userAuth, placeOrderStripe)


// User Features
orderRouter.post("/userOrder", userAuth, userOrders)

// verify payment
orderRouter.post("/verifyStripe", userAuth, verifyStripe)

export default orderRouter