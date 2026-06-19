import Admin from "../models/adminModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Student from "../models/studentModel.js";
import Company from "../models/companyModel.js";
import Application from "../models/applicationModel.js";

const generateAdminToken = (id) => {
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {
            expiresIn:"7d"
        }
    );
};

const registerAdmin = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const adminExists = await Admin.findOne({
            email
        });

        if(adminExists){
            return res.status(400).json({
                success:false,
                message:"Admin already Registered"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            name,
            email,
            password:hashedPassword
        });
        return res.status(200).json({
            success:true,
            message:"Admin Registered Successfully",
            admin
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"error.message"
        });
    }
};

const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const admin = await Admin.findOne({
            email
        });

        if(!admin){
            return res.status(404).json({
                success:false,
                message:"Admin Not Found"
            });
        }
        const isMatched = await bcrypt.compare(
            password,
            admin.password
        );
        if(!isMatched){
            return res.status(400).json({
                success:false,
                message:"Invalid Password"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Admin Login Successfull",
            token:generateAdminToken(
                admin._id
            ),
            admin:{
                id:admin._id,
                name:admin.name,
                email:admin.email,
            }

        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const getAdminDashboard = async (req, res) => {
    try{
        const totalStudent = await Student.countDocuments();
        const totalCompanies = await Company.countDocuments();
        const totalApplications = await Application.countDocuments();

        return res.status(200).json({
            success:true,
            totalStudent,
            totalCompanies,
            totalApplications
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

export {registerAdmin, loginAdmin, getAdminDashboard};