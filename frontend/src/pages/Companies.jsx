import { useEffect, useState } from "react";
import axios from "axios";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllCompanies = async () => {
    try{
        setLoading(true);
        const res = await axios.get(
            "https://smart-placement-portal-po8m.onrender.com/api/company/all"
        );
        console.log(res.data);
        setCompanies(res.data.companies);
        setLoading(false);
    }catch(error){
        console.log(error);
    }
    };

    const handleApply = async (companyId) => {
        try{
            const token = localStorage.getItem("token");
            console.log(token);
            
            const res = await axios.post(
                "https://smart-placement-portal-po8m.onrender.com/api/application/apply",
                {
                    companyId
                },
                {
                    headers:{
                    Authorization: `Bearer ${token}`
                }
                }
            );
            alert(res.data.message);
        }catch(error){
            if(error.response?.status === 400){
                alert(error.response?.data.message);
                return;
            }
            alert("Something went wrong");
        }
    }
    useEffect(()=> {
        getAllCompanies();
    },[]);
if(loading){
    return(
        <div className="h-screen flex justify-center items-center gap-2 font-semibold text-3xl">
            <div className='w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin'></div>
            <h1>Loading Companies...</h1>
        </div>
    );
}  

return(
    <div className="p-20">
        <h1 className="text-4xl font-bold mb-8">All Companies</h1>
        <div className="grid grid-cols-3 gap-6">
            {
                companies.map((company) => (
                    <div
                    key={company._id}
                    className="bg-white shadow-2xl rounded-2xl p-6 hover:shadow-2xl transition duration-300 border-" >
                        <h2 className="text-3xl font-bold mb-4">{company.companyName.toUpperCase()}</h2>

                        <p className="capitalize text-gray-700 mb-2"><span className="font-semibold">Role : </span>{company.role}</p>
 
                        <p className="capitalize text-gray-700 mb-2"><span className="font-semibold">Package : </span>{company.package}</p>

                        <p className="text-gray-700 mb-2"><span className="font-semibold">Location : </span>{company.location}</p>

                        <p className="text-gray-700 mb-2"><span className="font-semibold">Eligibility : </span>{company.eligibility}</p>

                        <p className="text-gray-700 mb-2"><span className="font-semibold">CGPA : </span>{company.cgpa}</p>

                        <p className="text-gray-700 mb-2"><span className="font-semibold">Description : </span>{company.description}</p>

                        <button
                        onClick={() => handleApply(company._id)}
                         className="bg-green-600 font-semibold text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-700">Apply</button>
                        
                    </div>
                ))
            }

        </div>
    </div>
);
};

export default Companies;