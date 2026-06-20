import Application from "../models/applicationModel.js";
import Student from '../models/studentModel.js';

const applyCompany = async (req, res) => {
    console.log("apply api hit");
    return res.status(400).json({
        success:false,
        message:"test message"
    })
    
try{
const studentId = req.student._id;
const {companyId} = req.body;

const student = await Student.findById(studentId);

const existingApplication = await Application.findOne({
    studentId,
    companyId
});

if(existingApplication){
    return res.status(400).json({
        success:false,
        message:"You already applied for this company"
    });
}

if(
    !student.name ||
    !student.college ||
    !student.degree ||
    !student.cgpa ||
    !student.skills ||
    !student.resume
){
    console.log("Resume",student.resume);
    console.log("Resume",student.cgpa);
    console.log("Resume",student.skills);
    
    return res.status(400).json({
        success:false,
        message:"Complete your profile  and upload resume before applying"
    });
}
console.log({
    name: student.name,
    college: student.college,
    degree: student.degree,
    cgpa: student.cgpa,
    skills: student.skills,
    resume: student.resume
});
const application = await Application.create({
    studentId,
    companyId
});
return res.status(201).json({
    success:true,
    message:"Applied Sucessfully",
    application,
})
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};

const getMyApplications = async (req,res) => {
try{
    const studentId = req.student._id;
    //find studentId with an entire obj details of compID
    const application = await Application.find({
        studentId,
    }).populate("companyId");
    console.log(application);
    

    return res.status(200).json({
        success:true,
        message:"Applications fetched Successfully",
        application,
    });
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};

const getAllApplications = async (req, res) => {
    console.log("hello boss");
    
    try{
        const application = await Application.find()
        .populate(
            "studentId",
            "name email college degree cgpa skills resume"
        )
        .populate(
            "companyId",
            "companyName role"
        );
        console.log(application);
        console.log("get all application");
        console.log(JSON.stringify(application[0], null, 2));
        
        
        return res.status(200).json({
            success:true,
            application
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const deleteApplication = async (req, res) => {
try{
    const {id} = req.params;

    const application = await Application.findByIdAndDelete(id);
    if(!application){
        return res.status(404).json({
            success:false,
            message:"Application Not Found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Application Deleted Successfully",
        application
    });
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};

const updateApplicationStatus = async (req, res) => {
    try{
        const {status} = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            {status},
            {new:true}
        )
        if(!application){
            return res.status(404).json({
                success:false,
                message:"Apllication Not Found"
            })
        }
        return res.status(200).json({
            success:true,
            messagge:"Status update successfull",
            application,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

export { applyCompany, getMyApplications, getAllApplications, deleteApplication, updateApplicationStatus };