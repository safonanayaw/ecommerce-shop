// this auth will authenticate when user when to update, add and place order 
// middleware will convert this user token into user id
import jwt from "jsonwebtoken"

const authUser = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success: false, message: "Not Authorized Login Again"})
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRETE)
        // use the id from createToken fxn in userController convert to userId
        req.body.userId = token_decode.id

        next()

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
export default authUser