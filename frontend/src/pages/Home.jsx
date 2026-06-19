import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const switchPageCompany = () => {
        navigate("/companies");
    };
    const switchPageYoYoCorp = () => {
        navigate("/yoyocorp");
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center py-16 px-6">

                <img
                    src="/logo.jpeg"
                    alt="Career Connect Logo"
                    className="w-40 h-40 object-contain mb-4"
                />

                <h2 className="text-2xl font-bold">
                    Career Connect
                </h2>

                <p className="text-gray-600 mb-6">
                    Connecting Talent, Creating Futures
                </p>

                <h1 className="text-5xl font-bold text-center mb-4">
                    Welcome To Smart Placement Portal
                </h1>

                <p className="text-gray-600 text-lg max-w-2xl mb-8">
                    Find your dream company, build your professional profile,
                    upload your resume, and apply for opportunities through
                    one powerful platform.
                </p>

                <button
                    onClick={switchPageCompany}
                    className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    Explore Companies
                </button>
            </div>

            {/* About Section */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-center mb-6">
                    About Career Connect
                </h2>

                <p className="text-center text-gray-600 max-w-4xl mx-auto">
                    Career Connect is a modern placement platform designed
                    to bridge the gap between students and recruiters.
                    Students can build professional profiles, upload resumes,
                    explore opportunities, and apply for jobs through a
                    simple and user-friendly interface.
                </p>
            </section>

            {/* Features Section */}
            <section className="max-w-6xl mx-auto px-6 py-12">

                <h2 className="text-3xl font-bold text-center mb-10">
                    What You Can Do
                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-bold mb-3">
                            👤 Create Profile
                        </h3>

                        <p className="text-gray-600">
                            Complete your profile with academic details,
                            skills, and achievements to improve your
                            placement readiness.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-bold mb-3">
                            📄 Upload Resume
                        </h3>

                        <p className="text-gray-600">
                            Upload and manage your resume easily.
                            Keep your latest resume ready for recruiters.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-bold mb-3">
                            💼 Apply For Jobs
                        </h3>

                        <p className="text-gray-600">
                            Explore company opportunities and apply
                            directly through the platform with a few clicks.
                        </p>
                    </div>

                </div>

            </section>

            {/* How It Works */}
            <section className="bg-white py-12">

                <h2 className="text-3xl font-bold text-center mb-10">
                    How It Works
                </h2>

                <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6 text-center px-6">

                    <div>
                        <h3 className="text-xl font-bold">1</h3>
                        <p>Register</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">2</h3>
                        <p>Complete Profile</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">3</h3>
                        <p>Upload Resume</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">4</h3>
                        <p>Explore Companies</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold">5</h3>
                        <p>Apply For Jobs</p>
                    </div>

                </div>

            </section>

            {/* Why Choose */}
            <section className="max-w-6xl mx-auto px-6 py-12">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Why Choose Career Connect?
                </h2>

                <div className="grid md:grid-cols-4 gap-6">

                    <div className="bg-white p-5 rounded-xl shadow text-center">
                        <h3 className="font-bold mb-2">
                            Easy To Use
                        </h3>
                        <p className="text-gray-600">
                            Simple and clean interface.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow text-center">
                        <h3 className="font-bold mb-2">
                            Centralized Platform
                        </h3>
                        <p className="text-gray-600">
                            Everything in one place.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow text-center">
                        <h3 className="font-bold mb-2">
                            Placement Ready
                        </h3>
                        <p className="text-gray-600">
                            Track profile completion easily.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow text-center">
                        <h3 className="font-bold mb-2">
                            Secure Access
                        </h3>
                        <p className="text-gray-600">
                            Protected student accounts.
                        </p>
                    </div>

                </div>

            </section>

            {/* YoYoCorp Section */}
            <section className="bg-gray-100 py-12 px-6">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Developed By YoYoCorp
                </h2>

                <p className="text-center text-gray-600 max-w-4xl mx-auto">
                    Career Connect is proudly developed by YoYoCorp.
                    Our mission is to build innovative digital solutions
                    that empower students, businesses, and communities
                    through technology.
                </p>

                <div className="text-center mt-8">
                    <button onClick={switchPageYoYoCorp}
                        className="bg-black text-white px-6 py-3 rounded-lg"
                    >
                        Learn More About YoYoCorp
                    </button>
                </div>

            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-8 text-center">

                <h3 className="text-2xl font-bold">
                    Career Connect
                </h3>

                <p className="mt-2 text-gray-300">
                    Connecting Talent, Creating Futures
                </p>

                <p className="mt-4 text-sm text-gray-400">
                    © 2026 Career Connect. All Rights Reserved.
                </p>

            </footer>

        </div>
    );
};

export default Home;