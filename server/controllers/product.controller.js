import ProductModel from "../models/product.model.js";
import asyncHandler from "express-async-handler";

export const createProductController = async(request,response)=>{
    try {
        const { 
            name ,
            image ,
            customerreview,
            colors,
            size,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        } = request.body 

        if(!name || !image[0] || !category[0] || !price || !description ){
            return response.status(400).json({
                message : "Enter required fields",
                error : true,
                success : false
            })
        }

        const product = new ProductModel({
            name ,
            image ,
            colors,
            customerreview,
            size,
            category,
            subCategory,
            unit,
            stock,
            price,
            discount,
            description,
            more_details,
        })
        const saveProduct = await product.save()

        return response.json({
            message : "Product Created Successfully",
            data : saveProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductController = async(request,response)=>{
    try {
        
        let { page, limit, search } = request.body 

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = search ? {
            $text : {
                $search : search
            }
        } : {}

        const skip = (page - 1) * limit

        const [data,totalCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product data",
            error : false,
            success : true,
            totalCount : totalCount,
            totalNoPage : Math.ceil( totalCount / limit),
            data : data
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByCategory = async(request,response)=>{
    try {
        const { id } = request.body 

        if(!id){
            return response.status(400).json({
                message : "provide category id",
                error : true,
                success : false
            })
        }

        const product = await ProductModel.find({ 
            category : { $in : id }
        }).limit(15)

        return response.json({
            message : "category product list",
            data : product,
            error : false,
            success : true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductByCategoryAndSubCategory  = async(request,response)=>{
    try {
        const { categoryId,subCategoryId,page,limit } = request.body

        if(!categoryId || !subCategoryId){
            return response.status(400).json({
                message : "Provide categoryId and subCategoryId",
                error : true,
                success : false
            })
        }

        if(!page){
            page = 1
        }

        if(!limit){
            limit = 10
        }

        const query = {
            category : { $in :categoryId  },
            subCategory : { $in : subCategoryId }
        }

        const skip = (page - 1) * limit

        const [data,dataCount] = await Promise.all([
            ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
            ProductModel.countDocuments(query)
        ])

        return response.json({
            message : "Product list",
            data : data,
            totalCount : dataCount,
            page : page,
            limit : limit,
            success : true,
            error : false
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const getProductDetails = async(request,response)=>{
    try {
        const { productId } = request.body 

        const product = await ProductModel.findOne({ _id : productId })


        return response.json({
            message : "product details",
            data : product,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//update product
export const updateProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide product _id",
                error : true,
                success : false
            })
        }

        const updateProduct = await ProductModel.updateOne({ _id : _id },{
            ...request.body
        })

        return response.json({
            message : "updated successfully",
            data : updateProduct,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//delete product
export const deleteProductDetails = async(request,response)=>{
    try {
        const { _id } = request.body 

        if(!_id){
            return response.status(400).json({
                message : "provide _id ",
                error : true,
                success : false
            })
        }

        const deleteProduct = await ProductModel.deleteOne({_id : _id })

        return response.json({
            message : "Delete successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

//search product
// export const searchProduct = async(request,response)=>{
//     try {
//         let { search, page , limit } = request.body 

//         if(!page){
//             page = 1
//         }
//         if(!limit){
//             limit  = 10
//         }

//         const query = search ? {
//             $text : {
//                 $search : search
//             }
//         } : {}

//         const skip = ( page - 1) * limit

//         const [data,dataCount] = await Promise.all([
//             ProductModel.find(query).sort({ createdAt  : -1 }).skip(skip).limit(limit).populate('category subCategory'),
//             ProductModel.countDocuments(query)
//         ])

//         return response.json({
//             message : "Product data",
//             error : false,
//             success : true,
//             data : data,
//             totalCount :dataCount,
//             totalPage : Math.ceil(dataCount/limit),
//             page : page,
//             limit : limit 
//         })


//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }
export const searchProduct = async (request, response) => {
    try {
        let { search, page, limit } = request.body;

        // Set default values for page and limit
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        // Validate page and limit
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        // Build the query
        let query = {};
        if (search) {
            // Check if text index exists by attempting a text search
            query = {
                $text: { $search: search }
            };
            // Fallback to regex search if text index isn't set up
            try {
                await ProductModel.find(query).limit(1); // Test query
            } catch (err) {
                if (err.name === 'MongoServerError' && err.code === 27) {
                    // Text index not found, use regex instead
                    query = {
                        $or: [
                            { name: { $regex: search, $options: 'i' } }, // Adjust fields as per your schema
                            { description: { $regex: search, $options: 'i' } }
                        ]
                    };
                } else {
                    throw err; // Rethrow other errors
                }
            }
        }

        const skip = (page - 1) * limit;

        const [data, dataCount] = await Promise.all([
            ProductModel.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate('category subCategory'),
            ProductModel.countDocuments(query)
        ]);

        return response.json({
            message: "Product data",
            error: false,
            success: true,
            data: data,
            totalCount: dataCount,
            totalPage: Math.ceil(dataCount / limit),
            page: page,
            limit: limit
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || "An error occurred while searching products",
            error: true,
            success: false
        });
    }
};




// Create or Update Product Review
export const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    if (!rating || !comment) {
        return res.status(400).json({
            message: "Rating and comment are required",
            error: true,
            success: false,
        });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
            error: true,
            success: false,
        });
    }

    // Ensure user is authenticated
    if (!req.user) {
        return res.status(401).json({
            message: "User not authenticated",
            error: true,
            success: false,
        });
    }

    // Check if user already reviewed the product
    const existingReviewIndex = product.reviews.findIndex(
        (review) => review.user.toString() === req.user._id.toString()
    );

    if (existingReviewIndex !== -1) {
        // If user already reviewed, update their review
        product.reviews[existingReviewIndex].rating = Number(rating);
        product.reviews[existingReviewIndex].comment = comment;
    } else {
        // Create a new review
        const newReview = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(newReview);
    }

    // Recalculate product rating
    product.numReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.numReviews;

    await product.save();

    return res.status(201).json({
        message: "Review added/updated successfully",
        error: false,
        success: true,
        reviews: product.reviews,
        rating: product.rating,
    });
});
