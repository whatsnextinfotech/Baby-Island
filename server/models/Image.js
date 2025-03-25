import mongoose from "mongoose";
const ImageSchema = new mongoose.Schema({ image : {
    type : Array,
    default : []
},});
const Image = mongoose.model('Image', ImageSchema)

export default Image