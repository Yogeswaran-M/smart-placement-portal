import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email:"",
        password:"",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            const res = await axios.post(
                "https://smart-placement-portal-po8m.onrender.com/api/admin/login",
                formData
            );
            console.log(res.data);

            localStorage.setItem(
                "adminToken",
                res.data.token
            );
            
            console.log(
                localStorage.getItem("lastLogin")
            );
            
            console.log("After Save :",localStorage.getItem("adminToken"));         

            setMessage(res.data.message);

            navigate("/admin/dashboard");

        }catch(error){

            setMessage(
                error.response.data.message
            );

        }

    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            <img
                    src="/logo.jpeg"
                    alt="Career Connect Logo"
                    className="w-40 h-40 object-contain mt-14"
                />
                <h2 className="text-2xl font-bold">
                    Career Connect
                </h2>

                <p className="text-gray-600 mb-6">
                    Connecting Talent, Creating Futures
                </p>

            <form
                onSubmit={handleSubmit}
                className="border-2 p-6 rounded-lg w-96 font-semibold text-l"
            >

                <h1 className="text-3xl font-semibold mb-4 flex justify-center">
                    Admin Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border p-2 w-full mb-3 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="border p-2 w-full mb-3 rounded"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 w-full rounded"
                >
                    Login
                </button>

                <p className="mt-3">
                    {message}
                </p>

            </form>

        </div>
    );
};

export default AdminLogin;