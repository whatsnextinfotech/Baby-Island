import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  })


const productSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    image : {
        type : Array,
        default : []
    },
   
    customerreview: { type: String, },
    
    category : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'category'
        }
    ],
    subCategory : [
        {
            type : mongoose.Schema.ObjectId,
            ref : 'subCategory'
        }
    ],

    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    }, 
    unit : {
        type : String,
        default : ""
    },
    colors: [{ type: String }], // Array of color options (e.g., ["Red", "Blue", "Black"])
    // Array of colors
    size: [{ type: String }], // Array of color options (e.g., ["Red", "Blue", "Black"])
    // Array of colors
    stock : {
        type : Number,
        default : null
    },
    price : {
        type : Number,
        defualt : null
    },
    discount : {
        type : Number,
        default : null
    },
    description : {
        type : String,
        default : ""
    },
    more_details : {
        type : Object,
        default : {}
    },
    publish : {
        type : Boolean,
        default : true
    }
},{
    timestamps : true
})

//create a text index
productSchema.index({
    name  : "text",
    description : 'text'
},{
    name : 10,
    description : 5
})


const ProductModel = mongoose.model('product',productSchema)

export default ProductModel