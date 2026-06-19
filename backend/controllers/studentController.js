import Student from "../models/studentModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

const registerStudent = async (req, res) => {
    try {
        const { name, email, password, college, degree, cgpa, skills } = req.body;

        //check empty fields
        if (!name || !email || !password || !college || !degree || !cgpa || !skills) {
            return res.status(400).json({
                message: "All fields are Required"
            });
        }

        //check exist student
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({
                message: "Student already exists"
            })
        }

        //create new student
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = await Student.create({
            name,
            email,
            password: hashedPassword,
            college,
            degree,
            cgpa,
            skills
        });
        return res.status(201).json({
            message: "Student Registered success",
            student
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

//Login
const loginStudent = async (req, res) => {
try{
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
        return res.status(400).json({
            message: "Student Not Found"
        });
        }

        const isMatched = await bcrypt.compare(password, student.password);
        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid Password"
           });
        }
        return res.status(200).json({
            message:"Login Successful",
            token:generateToken(student._id),
            student:{
                id:student._id,
                name:student.name,
                email:student.email,
                college:student.college,
                degree:student.degree,
                cgpa:student.cgpa,
                skills:student.skills,
                resume:student.resume
            },
        });
}catch(error){
        return res.status(500).json({
            message:"Server error",
            error:error.message,
        })
    }
        
};

const getStudentProfile = async (req, res) => {
    return res.status(200).json({
        success:true,
        student:req.Student
    });
};

//UPDATE
const updateStudentProfile = async (req, res) => {
try{
    //login panniyirka user id
    const studentId = req.student.id;
    const {name, college, degree, cgpa, skills} = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(studentId,
        {
            name,
            college,
            degree,
            cgpa,
            skills
        },
        {new:true}
    );
    return res.status(200).json({
        message:"Profile Updated Successfully",
        success:true,
        student:updatedStudent,
    });
}catch(error){
    res.status(500).json({
    success:false,
    message:error.message,  
    });
}
};

const uploadResumeController = async (req, res) => {
    try{
        const student = await Student.findById(req.student._id);
        if(!student){
            return res.status(404).json({
                success:false,
                message:"Student Not Found"
            });
        }
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type:"raw",
                folder:"resumes"
            }
        );
        student.resume = result.secure_url;
        await student.save();

        return res.status(200).json({
            success:true,
            message:"Resume Upload Successfully",
            student
        });
    }catch(error){
        return res.status(500).json({
            sucess:false,
            message:error.message
        });
    }
};


export { registerStudent, loginStudent, getStudentProfile, updateStudentProfile, uploadResumeController };