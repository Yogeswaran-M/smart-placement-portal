import { useEffect, useState } from "react";
import axios from 'axios';
import AdminNavbar from "../components/AdminNavbar";

const AdminApplications = () => {
    const [application, setApplication] = useState([]);
    const[loading, setLoading] = useState(true);

    const getAllApplications = async () => {
        try {
            setLoading(true);
            const token =
                localStorage.getItem("adminToken");
                console.log("adminToken", token);
                

            const res = await axios.get(
                "https://smart-placement-portal-po8m.onrender.com/api/application/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("Token:", token);
            console.log("Response", res.data);
            
            
            setApplication(res.data.application);
            setLoading(false);
        } catch (error) {
            console.log(error);

        }
    };
//application status
    const updateStatus = async (id, status) => {
        try{
            setLoading(true);
            const token = localStorage.getItem(
                "adminToken"
            );
            const res = await axios.put(
                `https://smart-placement-portal-po8m.onrender.com/api/application/status/${id}`,
                {status},
                {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            );
            console.log(res.data);
            
            await getAllApplications();
            setLoading(false);
        }catch(error){
            console.log(error);
            
        }
        
    }
    useEffect(() => {
        getAllApplications();
    }, []);

    return (
        <>
        <AdminNavbar/>
        <div>
            <h1>Manage Applications</h1>
            <table className="w-full border-gray-300 mt-4">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="border p-3 text-left">Student</th>

                        <th className="border p-3 text-left">Company</th>

                        <th className="border p-3 text-left">Status</th>

                    </tr>

                </thead>

                <tbody>

                    { loading ? (
                        <tr>
                            <td
                            colSpan="5"
                            className="text-center p-20 animate-pulse text-2xl" >
                                Loading Applications...
                            </td>
                        </tr>
                    ) : application.length === 0 ? (
                        <tr>
                            <td
                            colSpan="5"
                            className="text-center p-5">
                                Applications Not Found...
                            </td>
                        </tr>
                    ) :
                    (application.map((app) => (

                        <tr key={app._id}>

                            <td className="border p-3 capitalize">
                                {app.studentId?.name}
                            </td>

                            <td className="border p-3 uppercase">
                                {app.companyId?.companyName}
                            </td>

                            <td className="border p-3">
                                <select
                                  value={app.status}
                                  onChange={(e) => 
                                    updateStatus(
                                        app._id,
                                        e.target.value
                                    )
                                  }>
                                    <option value="Pending">Pending</option>
                                    <option value="Selected">Selected</option>
                                    <option value="Rejected">Rejected</option>
                                  </select>
                            </td>

                        </tr>

                    )))}

                </tbody>

            </table>
        </div>
        </>
    );
};

export default AdminApplications;