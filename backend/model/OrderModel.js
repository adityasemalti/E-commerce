import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    items:{type:Array, required:true},
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:String, required :true,default:'Order Placed'},
    payment:{type:Boolean, required:true,default:false},
    date:{type:Number, required:true,default:false},
})

const OrderModel = mongoose.model('Order',orderSchema)

export default OrderModel