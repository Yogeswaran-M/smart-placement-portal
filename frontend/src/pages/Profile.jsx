import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import pdfToText from 'react-pdftotext';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {CountUp} from "react-countup";

function Profile() {
    const student = JSON.parse(
        localStorage.getItem("student") || "{}"
    );
    const [formData, setFormData] = useState({
        name: student.name || "",
        email: student.email || "",
        college: student.college || "",
        degree: student.degree || "",
        cgpa: student.cgpa || "",
        skills: student.skills || "",
        resume: student.resume || ""
    });

    let completedFields = 0;
    if (formData.name) completedFields++;
    if (formData.college) completedFields++;
    if (formData.degree) completedFields++;
    if (formData.cgpa) completedFields++;
    if (formData.skills) completedFields++;
    if (formData.resume) completedFields++;

    const profileCompletion = Math.round(
        (completedFields / 6) * 100
    );

    const [editMode, setEditMode] = useState(false);
    const [resume, setResume] = useState(null);
    const [resumeScore, setResumeScore] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [animatedScore, setAnimatedScore] = useState(0);
    const[errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (showAnalysis && analysis?.atsScore) {
            setTimeout(() => {
                setAnimatedScore(analysis.atsScore);
            }, 200);
        }
    }, [showAnalysis, analysis]);

    const fileInputRef = useRef(null);

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await axios.put(
                "https://smart-placement-portal-po8m.onrender.com/api/students/profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
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
        } catch (error) {
            console.log(error);
        }
    };

    const analyzeResume = async () => {
        setLoading(true);
        setTimeout(async () => {       
        try {
            
            setErrorMessage("");
            console.time("resume analysis");
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:5000/api/resume/analyze",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log(res.data);
            setResumeScore(res.data.score);
            setSuggestions(res.data.suggestions);
            setAnalysis(res.data);
            setShowAnalysis(true);
            console.log(res.data);
            console.timeEnd("resume analysis");
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message || "Resume Analysis Failed"
            );
        }
        finally {
            setLoading(false);
        }
        }, 50);
    }

    const handleResumeUpload = async () => {
        try {
            if (!resume) {
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
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setFormData({
                ...formData,
                resume: res.data.resume
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
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
        <div className='min-h-screen bg-gray-100 pt-24 px-4 md:p-24'>
            <div className='bg-white shadow-lg rounded-xl p-5 md:p-8 max-w-5xl mx-auto'>
                <h1 className='text-2xl md:text-4xl font-bold mb-6'>Student Profile</h1>
                <div className='mb-6'>
                    <div className='flex justify-between mb-2'>
                        <span className='font-bold hover:underline'>Profile Completion</span>
                        <span className='font-bold'>{profileCompletion}%</span>
                    </div>
                    <div className='w-full bg-gray-300 rounded-full h-4 mb-2'>
                        <div className='bg-gradient-to-r from-red-600 to-green-600 h-4 rounded-full transition-all duration-500'
                            style={{ width: `${profileCompletion}%` }}></div>
                    </div>
                </div>
                <div className='space-y-5 max-w-2xl'>
                    <p>
                        <strong>Name :</strong>{" "}
                        {
                            editMode ? (
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded mt-2 md:mt-0 md:ml-2 w-full md:max-w-sm'
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
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            college: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded mt-2 md:mt-0 md:ml-2 w-full md:max-w-sm'
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
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            degree: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded mt-2 md:mt-0 md:ml-2 w-full md:max-w-sm'
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
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            cgpa: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded mt-2 md:mt-0 md:ml-2 w-full md:max-w-sm'
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
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            skills: e.target.value
                                        })
                                    }
                                    className='border p-2 rounded mt-2 md:mt-0 md:ml-2 w-full md:max-w-sm'
                                />
                            ) : (
                                formData.skills
                            )
                        }
                    </p>
                </div>
                <div className='flex flex-col md:flex-row gap-3 mt-5'>
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className='bg-gray-700 text-white font-semibold rounded-lg px-4 py-2 mt-3 ml-3 hover:bg-gray-900 transition'>Edit Profile</button>
                    {
                        editMode && (
                            <button
                                onClick={handleUpdate}
                                className='bg-green-600 text-white font-semibold rounded-lg p-2 mt-3 ml-3 hover:bg-green-700 transition'>Save Changes</button>
                        )

                    }
                </div>

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

                        <p className="text-md font-sans text-black mt-2">
                            Current File:
                        </p>

                        <p className="font-normal text-gray-500">
                            {formData.resume.split("/").pop()}
                        </p>

                        <div className="flex flex-wrap md:flex-row gap-3 mt-3">
                            <a href={formData.resume}
                                target='_blank'
                                rel='noreferrer'
                                className=' bg-black text-white px-7 py-2.5 rounded-lg w-fit h-fit'>View Resume</a>

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-600 text-white px-4 py-2.5 rounded-lg w-fit h-fit"
                            >
                                Replace Resume
                            </button>
                            <button
                                onClick={analyzeResume}
                                className='bg-gradient-to-r from-yellow-700 to-green-700 px-3 py-2 rounded-lg  text-white'>
                                Analyze Resume <span className='text-lg'>✦</span></button>






                        </div>
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
                        )
                        }

                        {
                            resumeScore && (
                                <div className='mt-6 border rounded-lg p-5 bg-white shadow '>
                                    <h2 className='text-xl font-bold'>Resume Score</h2>
                                    <h1 className='text-4xl font-bold text-green-600 mt-2'>{resumeScore}/100</h1>
                                    <h3 className='mt-4 font-semibold'>Suggestions</h3>
                                    <ul className='list-disc pl-5 mt-2'>{suggestions.map((item, index) => (
                                        <li key={index}>{item.replace(/\*\*/g, "")}</li>
                                    ))}</ul>
                                </div>
                            )
                        }

                    </div>


                )}
                {
                    analysis && showAnalysis && (
                        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">

                            <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6">

                                <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-3 border-b">

                                    <h2 className="text-3xl font-bold">
                                        Resume Analysis
                                    </h2>

                                    <button
                                        onClick={() => setShowAnalysis(false)}
                                        className="text-3xl font-bold text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                                    <div className="bg-blue-50 p-5 rounded-lg border text-center">

                                        <h3 className="font-semibold text-gray-700 mb-4">
                                            Resume Score
                                        </h3>

                                        <div className="text-6xl font-bold text-blue-600">
                                            <CountUp
                                                start={0}
                                                end={analysis.resumeScore}
                                                duration={2}
                                            />
                                        </div>

                                        <div className="mt-3 w-full bg-gray-200 rounded-full h-3">

                                            <div
                                                className="bg-blue-600 h-3 rounded-full transition-all duration-[2000ms]"
                                                style={{
                                                    width: `${analysis.resumeScore}%`
                                                }}
                                            />

                                        </div>

                                    </div>

                                    <div className="bg-green-50 p-5 rounded-lg border flex flex-col items-center">

                                        <h3 className="font-semibold text-gray-700 mb-4">
                                            ATS Score
                                        </h3>

                                        <div className="w-32 h-32">
                                            <div>
                                                {animatedScore}%
                                                {/* value={animatedScore}
                                                text={`${animatedScore}%`} */}
                                            </div>
                                        </div>

                                        <p className="mt-4 text-sm text-gray-600">
                                            ATS Compatibility Score
                                        </p>

                                    </div>

                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-2 text-green-700">
                                        Strengths
                                    </h3>

                                    <ul className="list-disc pl-6 space-y-1">
                                        {analysis.strengths?.map((item, index) => (
                                            <li key={index}>{item.replace(/\*\*/g, "")}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-2 text-red-700">
                                        Weaknesses
                                    </h3>

                                    <ul className="list-disc pl-6 space-y-1">
                                        {analysis.weaknesses?.map((item, index) => (
                                            <li key={index}>{item.replace(/\*\*/g, "")}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-2 text-orange-700">
                                        Missing Skills
                                    </h3>

                                    <ul className="list-disc pl-6 space-y-1">
                                        {analysis.missingSkills?.map((item, index) => (
                                            <li key={index}>{item.replace(/\*\*/g, "")}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-2 text-blue-700">
                                        Suggested Improvements
                                    </h3>

                                    <ul className="list-disc pl-6 space-y-1">
                                        {analysis.suggestedImprovements?.map((item, index) => (
                                            <li key={index}>{item.replace(/\*\*/g, "")}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-2 text-purple-700">
                                        Final Verdict
                                    </h3>

                                    <p className="bg-gray-50 border rounded-lg p-4 leading-7">
                                        {analysis.finalVerdict}
                                    </p>
                                </div>

                            </div>

                        </div>
                    )
                }

            </div>
            {
                errorMessage && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">

                        <div className="bg-white rounded-2xl p-8 w-[350px] text-center shadow-xl">

                            <div className="text-5xl mb-3">
                                ❌
                            </div>

                            <h2 className="text-xl font-bold">
                                Resume Analysis Failed
                            </h2>

                            <p className="mt-3 text-gray-600">
                                {errorMessage}
                            </p>

                            <button
                                onClick={() => setErrorMessage("")}
                                className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Close
                            </button>

                        </div>

                    </div>
                )
            }
        </div>
</>    )
};

export default Profile;
