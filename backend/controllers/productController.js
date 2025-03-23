import {v2 as cloudinary} from "cloudinary";
import upload from "../middleware/multer.js";
import productModel from "../models/productModel.js";
//function for adding product
const addProduct = async (req, res)=> {
    try{
        // getting req.body element passed
        const {name, description,price, category, subCategory, sizes, bestseller} = req.body;

        //getting req.files passed
        // re.files.image[] &&; check if image is added then selected first image index
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        //filter method to filter the underfine image, if image is not equal to undefine then save in images
        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined); 

        //uploading images to cloudinary and returning the uploaded images urls to imagesUrl array
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            //convert parse price as string to number
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            //set sizes to one array, convert to string and to string array
            size: JSON.parse(sizes),
            //convert  bestseller string to true or false
            bestseller: bestseller === "true" ? true : false,
            date: Date.now()
        }
        console.log(productData);
        //save the productData in the mongoDB productSchema using the productModel
        const product = new productModel(productData);
        //save product in mongo DB
        await product.save();
        console.log(name, description,price, category, subCategory, sizes, bestseller);
        // console.log(imagesUrl);

        res.json({success: true, message: "product Added"});
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//function for list product
const listProducts = async (req, res)=> {
    try{
        const product = await productModel.find({});
        res.json({success: true, product})
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//function for removing product
const removeProduct = async (req, res)=> {
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Product Removed"});

    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//function for single product info
const singleProduct = async (req, res)=> {
    try{
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product});
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {addProduct, listProducts, removeProduct, singleProduct};