import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
connectCloudinary()
mongoose.connect(`${process.env.MONGODB_URL}/Ecommerce`).then(()=>console.log('database connected'))
//api endpoints

app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('running backend')
})

app.listen(port)