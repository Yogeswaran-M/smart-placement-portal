import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    college:{
        type:String,
        required:true,
    },

    degree:{
        type:String,
        required:true,
    },

    cgpa:{
        type:String,
        required:true,
    },

    skills:{
        type:String,
        required:true,
    },
    
    resume:{
        type:String,
        default:""
    },
},
{
    timestamps:true,
}
);

const Student = mongoose.model("Student", studentSchema);

export default Student;