import Company from "../models/companyModel.js";

const addCompany = async (req,res) => {
try{
    const{
        companyName,
        role,
        package:companyPackage,
        location,
        eligibility,
        cgpa,
        description,
    } = req.body;
    
    
    //create new companies
    const newCompany = new Company({
        companyName,
        role,
        package:companyPackage,
        location,
        eligibility,
        cgpa,
        description,
    });
    await newCompany.save();

    return res.status(201).json({
        success:true,
        message:"Company added Sucessfully",
        company:newCompany
    });
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};

const getAllCompanies = async (req, res) => {
try{
    const companies = await Company.find({isActive:true}).sort({createdAt: -1});
    return res.status(200).json({
        success:true,
        message:"Companies fetched Successfully",
        companies
    });
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};

const getSingleCompany = async (req, res) => {
try{
    const {id} = req.params;

    const company = await Company.findById(id);
    if(!company){
        return res.status(404).json({
            success:false,
            message:"Company Not Found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Company fetched successfully",
        company
    });
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};

const deleteCompany = async (req, res) => {
try{
    const {id} = req.params;
    const company = await Company.findById(id);
    company.isActive = false;
    await company.save();
    if(!company){
        return res.status(400).json({
            success:false,
            message:"Company Not Found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Company Deleted Successfully"
    });
}catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    });
}
};

const updateCompany = async (req, res) => {
try{
    const {id} = req.params;
    const {companyName, role, package:companyPackage, location, eligibility, cgpa, description} = req.body;
    const updateData = {companyName, role, package:companyPackage, location, eligibility, cgpa, description};
    const company = await Company.findByIdAndUpdate(
        id,
        updateData,
        {returnDocument:"after"}
    );
    if(!company){
        return res.status(404).json({
            success:false,
            message:"Company Not Found"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Company Updated Successfully",
        company
    });
}catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}

const makeAllCompaniesActive = async () => {
    const result = await Company.updateMany(
        {},
        {
            $set:{
                isActive:true
            }
        }
    );
    console.log(result);
}

export { addCompany, getAllCompanies, getSingleCompany, deleteCompany, updateCompany, makeAllCompaniesActive }; 