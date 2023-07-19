import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String,require:true,trim:true},
    email:{type:String,require:true,trim:true},
    password:{type:String,require:false,trim:true},
    phonenumber:{type:Number,require:true,trim:true},
},
{ timestamps: true }

)


const User = mongoose.model("user", UserSchema);
// module.exports = User;
export default User;
