import express from 'express'
import {  placeOrder, userOrders,allOrders } from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router()


orderRouter.post('/place',authUser,placeOrder)

orderRouter.post('/userOrders',authUser,userOrders)
orderRouter.post ('/allOrders',adminAuth,allOrders)

export default orderRouter