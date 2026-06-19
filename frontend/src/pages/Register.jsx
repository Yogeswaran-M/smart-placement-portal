import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const[formData, setformData] = useState({
    name:"",
    email:"",
    password:"",
    college:"",
    degree:"",
    cgpa:"",
    skills:"",
  });
  const[message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]:e.target.value,
    });
  };
 //block refresh for details delete aagama iruka
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();

      const res = await axios.post(
        "https://smart-placement-portal-po8m.onrender.com/api/students/register",
        formData
      );
      setMessage(res.data.message);
      navigate("/login");
    }catch(error){
      setMessage(error.response.data.message);
    }
  };

return(
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-xl shadow-lg w-[400px]" 
    >
      <h1 className="text-3xl font-bold text-center mb-6">Register</h1>
      {
        message && (
          <p className="text-center mb-4 text-green-600 font-semibold">{message}</p>
        )
      }

      <input 
       type="text"
       name="name"
       placeholder="Enter your name"
       value={formData.name}
       onChange={handleChange}
       className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none" />

       <input 
       type="email"
       name="email"
       placeholder="Enter your email"
       value={formData.email}
       onChange={handleChange}
       className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none" />

       <input 
       type="password"
       name="password"
       placeholder="Enter your password"
       value={formData.password}
       onChange={handleChange}
       className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none" />

       <input 
       type="college"
       name="college"
       placeholder="Enter your college"
       value={formData.college}
       onChange={handleChange}
       className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none" />

       <input 
       type="degree"
       name="degree"
       placeholder="Enter your degree"
       value={formData.degree}
       onChange={handleChange}
       className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none" />

       <input 
       type="cgpa"
       name="cgpa"
       placeholder="Enter your cgpa"
       value={formData.cgpa}
       onChange={handleChange}
       className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none" />

       <input 
       type="skills"
       name="skills"
       placeholder="Enter your skills"
       value={formData.skills}
       onChange={handleChange}
       className="w-full border border-gray-300 p-3 rounded-lg mb-4 outline-none" />

       <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition" >Register</button>

        <p className="text-center mt-4">Already have an account? {" "}
          <Link to="/login"
          className="text-blue-600 font-semibold hover:underline">Login</Link>
        </p>
    </form>

  </div>
);
};

export default Register;