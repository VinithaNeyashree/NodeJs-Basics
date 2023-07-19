import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
   title:{type:String,required:true,trim:true},
   description:{type:String,required:true,trim:true},
   image: { type: String, required: true, trim: true },
},
{ timestamps: true }

)


const Blog = mongoose.model("blog", BlogSchema);
// module.exports = Blog;
export default Blog;
