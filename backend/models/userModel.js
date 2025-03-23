import mongoose from 'mongoose';

//user Schema
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}}
 },{minimize:false})
//I add minimize: false because mongoose will ignore
// and not save the cartData on first user create account
//and cartData with empty object will be ignore but with minimize: 
//false mongoose will not ignore the empty cartData object

//user model
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;