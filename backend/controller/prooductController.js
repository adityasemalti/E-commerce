import { json } from "express";
import productModel from "../model/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";
// Add product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestSeller
        } = req.body;

        // Collect uploaded images
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        // Upload images to Cloudinary
        const imageUrls = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        // Validation
        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.json({ success: false, message: "All required fields must be provided." });
        }

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true",
            image: imageUrls,
            date: Date.now(),
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Remove product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.json({ success: false, message: "Product not found." });
        }

        res.json({ success: true, message: "Product removed successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// List products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 }); // latest first
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


//single product

const singleProduct=async(req,res)=>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export { addProduct, removeProduct, listProducts,singleProduct };
