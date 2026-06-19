import React from 'react'
import AdminNavbar from '../components/AdminNavbar';
import { useEffect, useState } from "react";
import axios from "axios";

function AdminCompanies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCompany, setEditingCompany] = useState(null);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        companyName: "",
        role: "",
        package: "",
        location: "",
        eligibility: "",
        cgpa: "",
        description: ""
    });
    const [showForm, setShowForm] = useState(false);

    const getAllCompanies = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "https://smart-placement-portal-po8m.onrender.com/api/company/all"
            );
            console.log(res.data);
            setCompanies(res.data.companies);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const updateCompany = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            if (
                !editingCompany.companyName ||
                !editingCompany.role ||
                !editingCompany.package ||
                !editingCompany.location ||
                !editingCompany.eligibility ||
                !editingCompany.cgpa
            ) {
                alert("Please fill all fields");
            }
            const res = await axios.put(
                `https://smart-placement-portal-po8m.onrender.com/api/company/${editingCompany._id}`,
                editingCompany,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            await getAllCompanies();
            setEditingCompany(null);
            setMessage("Company Updated Successfully");
            setTimeout(() => {
                setMessage("");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCompany = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want delete this company?");
            if (!confirmDelete) {
                return;
            }
            const token = localStorage.getItem("adminToken");
            const res = await axios.delete(
                `https://smart-placement-portal-po8m.onrender.com/api/company/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res.data);

            await getAllCompanies();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (
            !formData.companyName ||
            !formData.role ||
            !formData.package ||
            !formData.location ||
            !formData.eligibility ||
            !formData.cgpa ||
            !formData.description
        ) {
            alert("Please fill all fields");
            return;
        }
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.post(
                `https://smart-placement-portal-po8m.onrender.com/api/company/add`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res.data);

            getAllCompanies();

            setFormData({
                companyName: "",
                role: "",
                package: "",
                location: "",
                eligibility: "",
                cgpa: "",
                description: ""
            });
            setShowForm(false);
            alert("Company Added Successfully");
        }catch(error){
            console.log(error);
            alert(
                error.response?.data?.message || "Failed to Add Company"
            );
        }
    }
    useEffect(() => {
        getAllCompanies();
    }, []);
    return (
        <>
            <AdminNavbar />

            <div className="p-6">
                {
                    editingCompany ? (
                        <div className='bg-white p-8 rounded-xl shadow-lg mb-8'>
                            <h2 className='text-2xl font-bold mb-4'>Edit Company</h2>
                            <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                <label className='md:w-40 font-semibold'>Company Name:</label>
                                <input
                                    type="text"
                                    value={editingCompany.companyName}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            companyName: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded w-full md:max-w-md'
                                />
                            </div>
                            <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                <label className='md:w-40 font-semibold'>Role:</label>
                                <input
                                    type="text"
                                    value={editingCompany.role}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            role: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded w-full md:max-w-md'
                                />
                            </div>

                            <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                <label className='md:w-40 font-semibold'>Package:</label>
                                <input
                                    type="text"
                                    value={editingCompany.package}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            package: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded w-full md:max-w-md'
                                />
                            </div>

                            <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                <label className='md:w-40 font-semibold'>Location:</label>
                                <input
                                    type="text"
                                    value={editingCompany.location}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            location: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded w-full md:max-w-md'
                                />
                            </div>

                            <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                <label className='md:w-40 font-semibold'>Eligibility:</label>
                                <input
                                    type="text"
                                    value={editingCompany.eligibility}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            eligibility: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded w-full md:max-w-md'
                                />

                            </div>

                            <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                <label className='md:w-40 font-semibold'>CGPA:</label>
                                <input
                                    type="text"
                                    value={editingCompany.cgpa}
                                    onChange={(e) =>
                                        setEditingCompany({
                                            ...editingCompany,
                                            cgpa: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded w-full md:max-w-md'
                                />
                            </div>
                            <br />

                            <div className='flex gap-3'>
                                <button
                                    onClick={updateCompany}
                                    className='bg-green-600 text-white p-2 rounded-lg'>Save Changes</button>
                                <button
                                    onClick={() => setEditingCompany(null)}
                                    className='bg-red-600 text-white px-4 py-2 rounded-lg'
                                >Cancel</button>
                            </div>
                        </div>

                    ) : null
                }
                {
                    message && (
                        <div className='bg-green-100 text-green-700 p-3 rounded mb-4'>{message}</div>
                    )
                }
                <div className='flex gap-245'>
                    <h1 className="text-3xl font-bold mb-6">
                        Manage Companies
                    </h1>
                    <button
                        onClick={() => setShowForm(true)} className='bg-green-600 text-white rounded-lg px-4 py-2 mb-5'>Add Company</button>

                </div>
                {
                    showForm && (
                        <div className='bg-white p-8 rounded-xl shadow-lg mb-8'>
                            <form onSubmit={handleSubmit}>
                                <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                    <label className='md:w-40 font-semibold'>Company Name : </label>
                                    <input type="text"
                                        value={formData.companyName}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                companyName: e.target.value
                                            })
                                        }
                                        className='border p-2 rounded w-full md:max-w-md' />
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                    <label className='md:w-40 font-semibold'>Role : </label>
                                    <input type="text"
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                role: e.target.value
                                            })
                                        }
                                        className='border p-2 rounded w-full md:max-w-md' />
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                    <label className='md:w-40 font-semibold'>Package : </label>
                                    <input type="text"
                                        value={formData.package}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                package: e.target.value
                                            })
                                        }
                                        className='border p-2 rounded w-full md:max-w-md' />
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                    <label className='md:w-40 font-semibold'>Location : </label>
                                    <input type="text"
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                location: e.target.value
                                            })
                                        }
                                        className='border p-2 rounded w-full md:max-w-md' />
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                    <label className='md:w-40 font-semibold'>Eligibility : </label>
                                    <input type="text"
                                        value={formData.eligibility}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                eligibility: e.target.value
                                            })
                                        }
                                        className='border p-2 rounded w-full md:max-w-md' />
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                    <label className='md:w-40 font-semibold'>CGPA : </label>
                                    <input type="text"
                                        value={formData.cgpa}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                cgpa: e.target.value
                                            })
                                        }
                                        className='border p-2 rounded w-full md:max-w-md' />
                                </div>
                                <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
                                    <label className='md:w-40 font-semibold'>Description : </label>
                                    <input type="text"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value
                                            })
                                        }
                                        className='border p-2 rounded w-full md:max-w-md' />
                                </div>
                                <div className='flex gap-3'>
                                    <button
                                        type='submit'
                                        className='bg-green-600 text-white p-2 rounded-lg'>Submit</button>
                                    <button
                                        onClick={() => setShowForm(false)}
                                        className='bg-red-600 text-white px-4 py-2 rounded-lg'
                                    >Cancel</button>
                                </div>
                            </form>
                        </div>


                    )
                }


                <table className="w-full border border-gray-300">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="border p-3">
                                Company
                            </th>

                            <th className="border p-3">
                                Role
                            </th>

                            <th className="border p-3">
                                Package
                            </th>

                            <th className="border p-3">
                                Location
                            </th>

                            <th className="border p-3">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            loading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className='text-center p-20 animate-pulse text-2xl'>
                                        Loading Companies...
                                    </td>
                                </tr>
                            ) : companies.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className='text-center p-5'>
                                        Not Companies Found
                                    </td>
                                </tr>
                            ) :
                                (companies.map((company) => (

                                    <tr key={company._id}>

                                        <td className="border p-3 uppercase">
                                            {company.companyName}
                                        </td>

                                        <td className="border p-3 capitalize">
                                            {company.role}
                                        </td>

                                        <td className="border p-3">
                                            {company.package}
                                        </td>

                                        <td className="border p-3">
                                            {company.location}
                                        </td>

                                        <td className="border p-3 text-center">

                                            <button
                                                onClick={() => setEditingCompany(company)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteCompany(company._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                )))}

                    </tbody>

                </table>

            </div>
        </>
    );
}

export default AdminCompanies;