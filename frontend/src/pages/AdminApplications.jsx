import { useEffect, useState } from "react";
import axios from 'axios';
import AdminNavbar from "../components/AdminNavbar";

const AdminApplications = () => {
    const [application, setApplication] = useState([]);
    const [loading, setLoading] = useState(true);

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

            console.log(res.data.application[0]);
            
            setApplication(res.data.application);
            console.log(res.data.application);
            setLoading(false);
        } catch (error) {
            console.log(error);

        }
    };
    //application status
    const updateStatus = async (id, status) => {
        try {
            setLoading(true);
            const token = localStorage.getItem(
                "adminToken"
            );
            const res = await axios.put(
                `https://smart-placement-portal-po8m.onrender.com/api/application/status/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res.data);

            await getAllApplications();
            setLoading(false);
        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        getAllApplications();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="pt-10 px-4 md:px-6 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Manage Applications</h1>
                <div className="bg-white rounded-xl shadow-lg border overflow-x-auto">
                    <table className="w-full min-w-[700px]">

                        <thead className="bg-black text-white">

                            <tr>

                                <th className="border p-3 text-left">Student</th>

                                <th className="border p-3 text-left">Company</th>

                                <th className="border p-3 text-left">CGPA</th>

                                <th className="border p-3 text-left">Skills</th>

                                <th className="border p-3 text-left">Resume</th>

                                <th className="border p-3 text-left">Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (
                                <div className="flex justify-center items-center gap-3 py-10">
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    <h2 className="font-semibold text-xl">
                                        Loading Applications...
                                    </h2>
                                </div>
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
                                            {app.studentId?.cgpa}
                                        </td>

                                        <td className="border p-3">
                                            {app.studentId?.skills}
                                        </td>

                                        <td className="border p-3">
                                            {
                                                app.studentId?.resume ? (
                                                    <a
                                                        href={app.studentId.resume}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                                    >
                                                        View Resume
                                                    </a>
                                                ) : (
                                                    "No Resume"
                                                )
                                            }
                                        </td>

                                        <td className="border p-3">
                                            <select
                                                className={`border rounded-lg px-3 py-2 font-semibold ${app.status === "Selected"
                                                    ? "bg-green-100 text-green-700"
                                                    : app.status === "Rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
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
            </div>
        </>
    );
};

export default AdminApplications;