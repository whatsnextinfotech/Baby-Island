
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
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
import wishlistRouter from './route/Wishlist.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'
import reviewRouter from './route/customerReviewRoutes.js'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const app = express()

// Middleware setup
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URI
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = process.env.PORT

// Default route
app.get('/', (req, res) => {
    res.json({
        message: `Server is running on port ${PORT}`
    })
})

// API routes
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/file', uploadRouter)
app.use('/api/subcategory', subCategoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)
app.use('/api/reviews', reviewRouter)

// Connect to database and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error(' Error connecting to the database:', error.message)
        process.exit(1)
    })