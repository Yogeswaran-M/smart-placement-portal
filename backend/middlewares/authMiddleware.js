import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";

const protect = async (req, res, next) => {
let token;
try {
 //check token exists
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //Get token from header
        token = req.headers.authorization.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Get student daata
        req.student = await Student.findById(decoded.id).select("-password");       //-pasword exclude get password from DB
        next();

    }else{
        return res.status(401).json({
            message:"Not Authorized, No Token"
        });
    }
} catch (error) {
    return res.status(401).json({
        message:"Token Failed",
    });
}
};

export default protect;