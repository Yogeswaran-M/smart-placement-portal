import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
 const navigate = useNavigate();

const { setIsLoggedIn } = useContext(AuthContext);
const [application, setApplication] = useState([]);
const[loading, setLoading] = useState(true);
const lastLogin = localStorage.getItem("lastLogin");

 const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if(!confirmLogout){
    return;
  }
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    setIsLoggedIn(false);
    navigate("/login");
 }

 const student = JSON.parse(
    localStorage.getItem("student")
 );

 const skillsCount = student?.skills ? student?.skills.split(",").length : 0;

 const getMyApplications = async () => {
  console.log("Function Start");
  console.log("Before API");
  
    try{
      console.log("hi");
      
      setLoading(true);
        const token = localStorage.getItem("token");
        console.log(token);
        
        const res = await axios.get(
            "http://localhost:5000/api/application/my-applications",
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        console.log("after API");
        
        console.log(res.data);
        
        console.log(res.data.application[0]);
        console.log(res.data.application[0].companyId);
        console.log(res.data.application[0].companyId.companyName);
        setApplication(res.data.application);
        setLoading(false);
    }catch(error){
        console.log(error);
        console.log("API error");
        console.log(error.response);
        setLoading(false); 
    }
};
useEffect(() => {
    getMyApplications();
},[]);
console.log(application);
console.log(application.length);



  return (
  <div className="p-20 min-h-screen bg-gray-100 p-8">

    {/* Header */}

    <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-lg mb-8 flex justify-between items-center">

      <div>
        <h1 className="text-4xl font-bold text-black">
          Welcome, {student?.name}{"🎉"}
        </h1>

        <p className="text-gray-600 mt-2 font-medium">
          {student?.email}
        </p>

        <p className="text-gray-500 mt-2 font-mono text-sm">
          Last Login : {lastLogin}
        </p>
      </div>

      <div className="flex gap-3">

        <button
        onClick={() => navigate("/profile")}
        className="bg-black hover:bg-gray-800 text-white font-bold px-5 py-2 rounded-lg transition">
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-black text-white font-bold px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </div>

    {/* Stats */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

      <div className="bg-white border border-gray-300 rounded-xl p-6 text-center shadow-md">
        <h3 className="text-gray-500">
          Applications
        </h3>

        <p className="text-4xl font-bold text-black mt-2">
          {application.length}
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-xl p-6 text-center shadow-md">
        <h3 className="text-gray-500">
          Skills
        </h3>

        <p className="text-4xl font-bold text-black mt-2">
          {skillsCount}
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-xl p-6 text-center shadow-md">
        <h3 className="text-gray-500">
          Profile Status
        </h3>

        <p className="text-xl font-bold text-gray-800 mt-2">
          Active
        </p>
      </div>

    </div>

    {/* Applied Companies */}

    <div className="flex justify-between items-center mb-5">

      <h2 className="text-3xl font-bold text-black">
        Applied Companies
      </h2>

      <span className="text-gray-600">
        Total : {application.length}
      </span>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

      {
  loading ? (

    <div className='flex items-center gap-2 mt-4'>
      <div className='w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin'></div>

      <h2 className='font-semibold text-2xl'>
        Loading Applied Companies...
      </h2>
    </div>

  ) : application.length === 0 ? (

    <div className='bg-white border border-gray-300 rounded-xl p-8 text-center col-span-3'>

      <h2 className='text-2xl font-bold mb-2'>
        No Applications Yet
      </h2>

      <p className='text-gray-600'>
        You haven't applied to any company yet.
      </p>

    </div>

  ) : (

    application.map((app, index) => (

      <div
        key={app._id}
        className="bg-white border border-gray-300 rounded-xl p-5 shadow-md hover:shadow-2xl transition duration-300"
      >

        <h3 className="uppercase text-2xl font-bold text-black mb-3">
          {index + 1}. {app.companyId?.companyName}
        </h3>

        <div className="space-y-2 text-gray-700">

          <p className='capitalize'>
            <span className="font-semibold text-black">
              Role:
            </span>{" "}
            {app.companyId?.role}
          </p>

          <p>
            <span className="font-semibold text-black">
              Package:
            </span>{" "}
            {app.companyId?.package}
          </p>

          <p>
            <span className="font-semibold text-black">
              Location:
            </span>{" "}
            {app.companyId?.location}
          </p>

          <p>
            <span className="font-semibold text-black">
              Eligibility:
            </span>{" "}
            {app.companyId?.eligibility}
          </p>

          <p>
            <span className="font-semibold text-black">
              Status:
            </span>{" "}
            {app.status}
          </p>

        </div>

        <div className="mt-4">
          <span
            className={
              app.status === "Selected"
                ? "bg-green-600 text-white font-bold p-2 rounded-xl"
                : app.status === "Rejected"
                ? "bg-red-600 text-white font-bold p-2 rounded-xl"
                : "bg-yellow-300 text-black font-bold p-2 rounded-xl"
            }
          >
            Applied ✓
          </span>
        </div>

      </div>

    ))

  )
}

    </div>

  </div>
);
};

export default Dashboard