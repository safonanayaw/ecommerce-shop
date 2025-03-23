import mongoose from 'mongoose';

//creating schema: structure to create the database
const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:Number, require:true},
    image: {type:Array, require:true},
    category: {type:String, require:true},
    subCategory: {type:String, require:true},
    size: {type:Array, require:true},
    bestseller: {type:Boolean},
    date: {type:Number, require:true},
})

//Using Schema to Create model
// when model is available use product or use productSchema
const productModel = mongoose.models.product || mongoose.model('product', productSchema)
// this productModel will be created multiple times when project is run to solve
//  this we need to add mongoose.models.product which will make the product model be created once


export default productModel