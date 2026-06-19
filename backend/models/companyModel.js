import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    role:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    package:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    eligibility:{
        type:String,
        required:true
    },
    cgpa:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
},{timestamps:true});

//same company + role save block
companySchema.index({
    companyName:1,
    role:1,
},{unique:true});

const Company = mongoose.model("Company", companySchema);

export default Company;