import axios from 'axios';
import React, { useState, useRef } from 'react';

function Profile() {
    const student = JSON.parse(
        localStorage.getItem("student") || "{}"
    );
    const [formData, setFormData] = useState({
        name:student.name || "",
        email:student.email || "",
        college:student.college || "",
        degree:student.degree || "",
        cgpa:student.cgpa || "",
        skills:student.skills || "",
        resume:student.resume || ""
    });

    let completedFields = 0;
    if(formData.name) completedFields++;
    if(formData.college) completedFields++;
    if(formData.degree) completedFields++;
    if(formData.cgpa) completedFields++;
    if(formData.skills) completedFields++;
    if(formData.resume) completedFields++;

    const profileCompletion = Math.round(
        (completedFields / 6) * 100
    );

    const[editMode, setEditMode] = useState(false);
    const[resume, setResume] = useState(null);
    // const[studentData, setStudentData] = useState(null);

    const fileInputRef = useRef(null);

    const handleUpdate = async () => {
        try{
            const token = localStorage.getItem("token");

            const res = await axios.put(
                "https://smart-placement-portal-po8m.onrender.com/api/students/profile",
                formData,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setFormData(res.data.student);
            localStorage.setItem(
                "student",
                JSON.stringify(res.data.student)
            );
            setEditMode(false);
            alert("Profile Updated Sucessfully");
        }catch(error){
            console.log(error);
        }
    };

    const handleResumeUpload = async () => {
        try{
            if(!resume){
                alert("Please Select Resume");
                return;
            }
            const formData = new FormData();
            formData.append(
                "resume", resume
            );
            const token = localStorage.getItem("token");
            const res = await axios.put(
                "https://smart-placement-portal-po8m.onrender.com/api/students/uploads/resumes",
                formData,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setFormData( {
                ...formData,
                resume:res.data.resume
            });
            console.log("upload resume");
            console.log(res.data);
            console.log(formData.resume);
            
            
            
            // const updatedProfile = {
            //     ...formData,
            //     resume:res.data.resume
            // };
            setFormData(res.data.student);
            localStorage.setItem(
                "student",
                JSON.stringify(res.data.student)
            );
            setResume(null);
            alert(res.data.message);
        }catch(error){
            console.log(error);
        }
    };
return(
    <div className='min-h-screen bg-gray-100 p-20'>
        <div className='bg-white shadow-lg rounded-xl p-8'>
            <h1 className='text-4xl font-bold mb-6'>Student Profile</h1>
            <div className='mb-6'>
                <div className='flex justify-between mb-2'>
                    <span className='font-bold hover:underline'>Profile Completion</span>
                    <span className='font-bold'>{profileCompletion}%</span>
                </div>
                <div className='w-full bg-gray-300 rounded-full h-4 mb-2'>
                    <div className='bg-black h-4 rounded-full transition-all duration-500'
                    style={{width: `${profileCompletion}%`}}></div>
                </div>
            </div>
            <div className='space-y-4'>
                <p>
                    <strong>Name :</strong>{" "}
                    {
                        editMode ? (
                            <input 
                            type="text"
                            value={formData.name}
                            onChange={(e)=>
                                setFormData({
                                ...formData,
                                name:e.target.value    
                            })
                            }
                            className='border p-2 rounded ml-2'
                            />
                        ) : (
                            formData.name
                        )
                    }
                </p>
                {/* <p>
                    <strong>email :</strong>{" "}
                    {
                        editMode ? (
                            <input 
                            type="text"
                            value={formData.email}
                            onChange={(e)=>
                                setFormData({
                                ...formData,
                    email:e.target.value    
                            })
                            }
                            className='border p-2 rounded ml-2'
                            />
                        ) : (
                            formData.email
                        )
                    }
                </p> */}
                <p>
                    <strong>College :</strong>{" "}
                    {
                        editMode ? (
                            <input 
                            type="text"
                            value={formData.college}
                            onChange={(e)=>
                                setFormData({
                                ...formData,
                                college:e.target.value    
                            })
                            }
                            className='border p-2 rounded ml-2'
                            />
                        ) : (
                            formData.college
                        )
                    }
                </p>
                <p>
                    <strong>Degree :</strong>{" "}
                    {
                        editMode ? (
                            <input 
                            type="text"
                            value={formData.degree}
                            onChange={(e)=>
                                setFormData({
                                ...formData,
                                degree:e.target.value    
                            })
                            }
                            className='border p-2 rounded ml-2'
                            />
                        ) : (
                            formData.degree
                        )
                    }
                </p>
                <p>
                    <strong>CGPA :</strong>{" "}
                    {
                        editMode ? (
                            <input 
                            type="text"
                            value={formData.cgpa}
                            onChange={(e)=>
                                setFormData({
                                ...formData,
                                cgpa:e.target.value    
                            })
                            }
                            className='border p-2 rounded ml-2'
                            />
                        ) : (
                            formData.cgpa
                        )
                    }
                </p>
                <p>
                    <strong>Skills :</strong>{" "}
                    {
                        editMode ? (
                            <input 
                            type="text"
                            value={formData.skills}
                            onChange={(e)=>
                                setFormData({
                                ...formData,
                                skills:e.target.value    
                            })
                            }
                            className='border p-2 rounded ml-2'
                            />
                        ) : (
                            formData.skills
                        )
                    }
                </p>
            </div>
            <button
            onClick={() => setEditMode(!editMode)}
             className='bg-gray-700 text-white font-semibold rounded-lg p-2 mt-3 hover:bg-gray-900 transition'>Edit Profile</button>
             {/* <button
onClick={() => setEditMode(!editMode)}
className='bg-gray-700 text-white font-semibold rounded-lg p-2 mt-3 hover:bg-gray-900 transition'
>
Edit Profile
</button> */}
<input
            ref={fileInputRef}
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                hidden
                onChange={(e) =>
                    setResume(e.target.files[0])
                }
            />
{!formData.resume && (
    <div className="mt-4">

        <label
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer bg-black text-white px-4 py-2 rounded-lg inline-block"
        >
            Choose Resume
        </label>

        <p className="mt-2">
            {resume ? resume.name : "No Resume Selected"}
        </p>

        <button
            onClick={handleResumeUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-3"
        >
            Upload Resume
        </button>

    </div>
)}

{formData.resume && (
    <div className="mt-4 p-4 bg-green-50 border border-green-300 rounded-lg">

        <p className="font-semibold text-green-700">
            Resume Uploaded Successfully ✅
        </p>

        <p className="text-sm text-gray-600 mt-2">
            Current File:
        </p>

        <p className="font-medium">
            {formData.resume.split("\\").pop()}
        </p>

        <div className="flex flex-col gap-3 mt-3">
            <a href={`https://smart-placement-portal-po8m.onrender.com/${formData.resume}`}
            target='_blank'
            rel='noreferrer'
            className=' bg-black text-white px-7 py-2 rounded-lg w-fit'>View Resume</a>

            <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg w-fit"
            >
                Replace Resume
            </button>

            {resume && (
                <>
                    <p className="text-sm font-medium">
                        Selected: {resume.name}
                    </p>

                    <button
                        onClick={handleResumeUpload}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg w-fit"
                    >
                        Upload New Resume
                    </button>
                </>
            )}

        </div>
<p>{formData.resume}</p>
    </div>
)}
             {
                editMode && (
                    <button
                    onClick={handleUpdate}
                     className='bg-green-600 text-white font-semibold rounded-lg p-2 mt-3 ml-3 hover:bg-green-700 transition'>Save Changes</button>
                )
                
             }
        </div>
    </div>
)
};

export default Profile;
