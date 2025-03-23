//import express from express parkage
import express from "express";
import {addProduct, listProducts, removeProduct, singleProduct} from '../controllers/productController.js';
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();
// add upload method to router since add route will be use to upload images
//filed
productRouter.post('/add', adminAuth, upload.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 2}, {name: 'image3', maxCount: 3}, {name: 'image4', maxCount: 4}]), addProduct);
productRouter.post('/remove', adminAuth, removeProduct);
productRouter.post('/single', adminAuth, singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;