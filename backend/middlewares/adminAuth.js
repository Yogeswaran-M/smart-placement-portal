import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';

const adminAuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(404).json({
                success:false,
                message:"Token Not Found"
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.admin = await Admin.findById(
            decoded.id
        );
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unauthorized"
        });
    }
};

export default adminAuth;