import UserModel from "../model/UserModel.js";


const addToCart =async(req,res)=>{
    const {userId, itemId, size} = req.body;
    try {
    const userData= await UserModel.findById(userId)
    let cartData = await userData.cartData;
    if(cartData[itemId])
    {
        if(cartData[itemId][size])
        {
            cartData[itemId][size]+=1;
        }
        else{
            cartData[itemId][size]=1
        }
    }else
    {
        cartData[itemId]={}
        cartData[itemId][size]=1
    }
    await UserModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true, message:"Added to Cart"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


const updateCart = async (req,res)=>{
    try {
        const {userId, itemId,size, quantity} = req.body;
        const userData= await UserModel.findById(userId)
        let cartData = await userData.cartData;
        cartData[itemId][size]= quantity

        await UserModel.findByIdAndUpdate(userId,{cartData})
        res.json({success:true, message:"Cart Updated"})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}


const getUserCart =async(req,res)=>{
    try {
        const {userId} = req.body
        const userData= await UserModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({success:true, cartData})


    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


export {addToCart,getUserCart,updateCart}