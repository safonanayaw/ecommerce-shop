import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//Middleware
app.use(express.json()) // Parses incoming JSON requests and puts the parsed data in req.body
app.use(cors()) // Enables Cross-Origin Resource Sharing (CORS) for all routes

//API endpoints for userRouter
app.use('/api/user', userRouter)

//API endpoint for productRouter
app.use('/api/product', productRouter)

// API endpoint for cartRouter
app.use('/api/cart', cartRouter)

// API endpoint for orderRouter
app.use('/api/order', orderRouter)

app.get('/', (req, res)=>{
    res.send('API WORKING')
})

//Start Express server
app.listen(port, ()=> console.log('Server started on PORT : ' + port))
