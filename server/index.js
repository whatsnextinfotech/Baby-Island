import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import WishlistRouter from './route/Wishlist.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'
import ReviewRouter from "./route/customerReviewRoutes.js";
// import carouselRouter from './route/Banner.route.js';
// import imageRoutes from './route/imageRoutes.js'
// import uploadRoute from "./route/Banner.route.js";
// import wishlistRouter from './route/Wishlist.route.js'


const app = express()
app.use(cors({
    credentials : true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT 

app.get("/",(request,response)=>{
    ///server to client
    response.json({
        message : "Server is running " + PORT
    })
})

app.use('/api/user',userRouter)
app.use("/api/category",categoryRouter)
app.use("/api/file",uploadRouter)
app.use("/api/subcategory",subCategoryRouter)
app.use("/api/product",productRouter)
app.use("/api/cart",cartRouter)
app.use("/api/wishlist",WishlistRouter)
app.use("/api/address",addressRouter)
app.use('/api/order',orderRouter)
app.use("/api/reviews", ReviewRouter);

// app.use('/api/carousel', carouselRouter)
// app.use('/api/images', imageRoutes);
// app.use("/api/upload", uploadRoute); 

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running",PORT)
    })
})

