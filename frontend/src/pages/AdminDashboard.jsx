import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {

    const [companies, setCompanies] = useState([]);
    const [application, setApplication] = useState([]);
    const [loading, setLoading] = useState(true);
    const lastLogin = localStorage.getItem("lastLogin");

    const getDashboardData = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            const companyRes = await axios.get(
                "http://localhost:5000/api/company/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(companyRes);


            const applicationRes = await axios.get(
                "http://localhost:5000/api/application/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(applicationRes);


            setCompanies(companyRes.data.companies);
            setApplication(applicationRes.data.application);

            setLoading(false);

        } catch (error) {
            console.log("full error");
            console.log(error.response?.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    const activeCompanies =
        companies.filter(
            (company) => company.isActive === true
        ).length;

    const inactiveCompanies =
        companies.filter(
            (company) => company.isActive === false
        ).length;

    const recentApplications =
        application.slice(0, 5);

    if (loading) {
        return (
            <>
                <AdminNavbar />

                <div className="p-6 flex items-center gap-3">
                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

                    <h2 className="text-xl font-semibold">
                        Loading Dashboard...
                    </h2>
                </div>
            </>
        );
    }

    return (
        <>
            <AdminNavbar />

            <div className="p-6">

                {/* Welcome Card */}

                <div className="bg-white text-black rounded-2xl p-6 mb-8 shadow-lg">

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Left Side */}

                        <div>

                            <h1 className="text-4xl font-bold mb-2">
                                Welcome Admin 👋
                            </h1>

                            <p className="text-black text-md">
                                Manage companies, applications and placement activities efficiently.
                            </p>
                            <p className="text-gray-500 mt-2 font-mono text-sm">
                                Last Login : {lastLogin}
                            </p>

                        </div>

                        {/* Right Side */}

                        <div>

                            <img
                                src="/logo.jpeg"
                                alt="Company Logo"
                                className="w-24 h-24 md:w-32 md:h-32 object-contain"
                            />

                        </div>

                    </div>

                </div>

                {/* Stats Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white rounded-xl shadow-md p-6 border">
                        <h3 className="text-gray-500 font-semibold">
                            Total Companies
                        </h3>

                        <p className="text-4xl font-bold mt-2">
                            {companies.length}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border">
                        <h3 className="text-gray-500 font-semibold">
                            Total Applications
                        </h3>

                        <p className="text-4xl font-bold mt-2">
                            {application.length}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border">
                        <h3 className="text-gray-500 font-semibold">
                            Active Companies
                        </h3>

                        <p className="text-4xl font-bold mt-2 text-green-600">
                            {activeCompanies}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6 border">
                        <h3 className="text-gray-500 font-semibold">
                            Inactive Companies
                        </h3>

                        <p className="text-4xl font-bold mt-2 text-red-600">
                            {inactiveCompanies}
                        </p>
                    </div>

                </div>

                {/* Two Column Layout */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Recent Applications */}

                    <div className="bg-white rounded-xl shadow-md border p-5">

                        <h2 className="text-2xl font-bold mb-4">
                            Recent Applications
                        </h2>

                        {
                            recentApplications.length === 0 ? (
                                <p className="text-gray-500">
                                    No Applications Found
                                </p>
                            ) : (
                                <div className="space-y-3">

                                    {
                                        recentApplications.map((app) => (

                                            <div
                                                key={app._id}
                                                className="border rounded-lg p-3"
                                            >

                                                <p>
                                                    <span className="font-bold">
                                                        Student :
                                                    </span>{" "}
                                                    {app.studentId?.name}
                                                </p>

                                                <p>
                                                    <span className="font-bold">
                                                        Company :
                                                    </span>{" "}
                                                    {app.companyId?.companyName}
                                                </p>

                                                <p>
                                                    <span className="font-bold">
                                                        Status :
                                                    </span>{" "}
                                                    {app.status}
                                                </p>

                                            </div>

                                        ))
                                    }

                                </div>
                            )
                        }

                    </div>

                    {/* System Status */}

                    <div className="bg-white rounded-xl shadow-md border p-5">

                        <h2 className="text-2xl font-bold mb-4">
                            System Status
                        </h2>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">
                                <span className="text-green-600 text-xl">
                                    ✅
                                </span>

                                <p>
                                    Student Portal Active
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-green-600 text-xl">
                                    ✅
                                </span>

                                <p>
                                    Resume Upload Working
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-green-600 text-xl">
                                    ✅
                                </span>

                                <p>
                                    Application Module Working
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-green-600 text-xl">
                                    ✅
                                </span>

                                <p>
                                    Company Management Working
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Admin Notes */}

                <div className="bg-white rounded-xl shadow-md border p-5 mt-6">

                    <h2 className="text-2xl font-bold mb-4">
                        Admin Notes
                    </h2>

                    <ul className="list-disc pl-5 space-y-2">

                        <li>
                            Keep company details updated regularly.
                        </li>

                        <li>
                            Review applications frequently.
                        </li>

                        <li>
                            Avoid deleting companies with active applications.
                        </li>

                        <li>
                            Monitor placement activities consistently.
                        </li>

                    </ul>

                </div>

            </div>
        </>
    );
};

export default AdminDashboard;