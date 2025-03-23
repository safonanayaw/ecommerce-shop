import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";

// generate token fxn
const createToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRETE)
}

//Route for user Login fxn
const loginUser = async (req, res) => {
    try {
    //get user email and password from the request body sent
    const {email, password} = req.body;

    //if user with email from req.body is available then store in user
    const user = await userModel.findOne({email});

    //if user doesn't not exist then send res
    if (!user) {
        return res.json({success: false, message: "User does not exist"})
    }

    //if user exist compare password from req.body to password saved in db
    const isMatch = await bcrypt.compare(password, user.password);
    // second para of bcrypt.compare is password saved to database

    // if user exist then generate token with user id and send to user
    if (isMatch) {
        const token = createToken(user._id);
        res.json({success:true, token})
    }else{
        res.json({success:false, message: "Invalid credentials"})
    }

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}


// Route for user registration fxn
const registerUser = async (req, res) => {

        try {
            const {name, email, password} = req.body;
            
            // checking user already exist or not
            const exists = await userModel.findOne({email});
            if (exists) {
                return res.json({success: false, message: "user already exist"})
            }

            // validation email format & strong password
            if (!validator.isEmail(email)) {
                return res.json({success: false, message: "Please enter a valid email"})
            }

            if (password.length < 8) {
                return res.json({success: false, message: "Please enter a strong password"})
            }

            //hashing user password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);

            //create new user with name, email and hashedPassword
            const newUser =  new userModel({
                name,
                email,
                password: hashedPassword
            })

            //save user in database
            const user = await newUser.save()

            //create token by passing user id to createToken fxn for user to login to application
            const token = createToken(user._id)

            //after token generate set the token as a response
            res.json({success: true, token})

        } catch (error) {
            console.log(error);
            res.json({success: false, message: error.message})
        }

}

//Route for admin Login fxn
const adminLogin = async (req, res) => {
    try{
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password, process.env.JWT_SECRETE)
            res.json({success: true, token});

        }else{
            res.json({success: false, message: "Invalid credentials"})
        }
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

// exporting route fxns
export {loginUser, registerUser, adminLogin}