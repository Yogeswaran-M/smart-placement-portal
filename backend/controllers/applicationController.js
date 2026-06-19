import Application from "../models/applicationModel.js";

const applyCompany = async (req, res) => {
try{
const studentId = req.student._id;
const {companyId} = req.body;

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
    try{
        const application = await Application.find()
        .populate(
            "studentId",
            "name email college"
        )
        .populate(
            "companyId",
            "companyName role"
        );
        console.log(application);
        console.log("get all application");
        
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