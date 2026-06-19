import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const[formData, setFormData] = useState({
        email:"",
        password:""
    });

    const[message, setMessage] = useState("");
    const navigate = useNavigate();

    const { setIsLoggedIn } = useContext(AuthContext);

   //block refresh for details delete aagama iruka
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("login button clicked");
        try {
            const adminRes = await axios.post(
                "https://smart-placement-portal-po8m.onrender.com/api/admin/login",
                formData
            );
            console.log("Admin Login Success");
            console.log(adminRes.data);
            
            
            localStorage.setItem(
                "adminToken",
                adminRes.data.token
            );
            localStorage.setItem(
                "admin",
                JSON.stringify(adminRes.data.admin)
            );
            localStorage.setItem(
                "lastLogin",
                new Date().toLocaleString()
            );
            console.log(
                localStorage.getItem("lastLogin")
            );
            
            navigate("/admin/dashboard");
        } catch (adminError) {
        try{
            const studentRes = await axios.post(
                "https://smart-placement-portal-po8m.onrender.com/api/students/login",
                formData
            );
            console.log(studentRes.data);
            
            setMessage(studentRes.data.message);
            localStorage.setItem(
                "token",
                studentRes.data.token
            );
            localStorage.setItem(
                "student",
                JSON.stringify(studentRes.data.student)                         //stringify used for string data only get dont get obj data
            );
            localStorage.setItem(
                "lastLogin",
                new Date().toLocaleString()
            );
            setIsLoggedIn(true);
            navigate("/dashboard");
            
            
        }catch(studentError){
            setMessage(studentError.response?.data?.message || "Invalid Email or Password");
        } 
      }
    }
return(
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white w-[400px] p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">
                        Email
                    </label>

                    {
                    message && (
                        <p className="text-center mb-4 text-green-600 font-semibold"> {message} </p>
                    )
                    }

                    <input 
                     type="email"
                     placeholder="Enter your email"
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email:e.target.value,})}
                     className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-black" />
                </div>
                <div className="mb-6">
                    <label className="block mb-2 font-semibold">
                        Password
                    </label>
                    <input 
                     type="password"
                     placeholder="Enter your password"
                     value={formData.password}
                     onChange={(e) => setFormData({...formData, password:e.target.value})}
                     className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-black" />
                </div>
                
                <button type="submit" 
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
                >Login</button>
            </form>
            <p className="text-center mt-5 text-gray-600">Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register</Link>
            </p>

        </div>

    </div>
)
};

export default Login;