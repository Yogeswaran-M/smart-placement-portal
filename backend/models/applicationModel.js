import { application } from "express";
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",                        //company collection connect
        reqiured:true,
    },
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",                        //student collection connect
        reqiured:true,
    },
    status:{
        type:String,
        enum:["Pending", "Selected", "Rejected"],
        default:"Pending",
    }
});

//same student + company id save block
applicationSchema.index({
    studentId:1,                           
    companyId:1,
    
},{unique:true});

const Application = mongoose.model("Application", applicationSchema);

export default Application;