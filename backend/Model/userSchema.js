import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    "userName":{
        type:String,
        required:true
    },
    "Email":{
        type:String,
        required:true
    },
    "passWord":{
        type:String,
        required:true
    }
});

export default mongoose.model("user",userSchema);    //Export "userSchema" model of mongoose by the name "user".