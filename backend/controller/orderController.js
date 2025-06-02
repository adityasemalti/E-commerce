import OrderModel from "../model/OrderModel.js";
import UserModel from "../model/UserModel.js";

const placeOrder= async(req,res)=>{
    try {
        const {userId, items, amount, address} = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new OrderModel(orderData)
        await newOrder.save()
        await UserModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Placed"})

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


const allOrders =async(req,res)=>{
    try {
        const orders = await OrderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}


const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body;
        const orders = await OrderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }

}




export {placeOrder,userOrders,allOrders}