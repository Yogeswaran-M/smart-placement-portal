import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) {
            return;
        }
        localStorage.removeItem("token");
        localStorage.removeItem("student");
        setIsLoggedIn(false);
        navigate("/login");
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full bg-gray-900 text-white px-4 md:px-8 py-4 flex justify-between items-center z-50">

                <h1 className="text-xl md:text-2xl font-bold">
                    Career🔗Connect
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6">
                    <li>
                        <Link to="/">Home</Link>
                    </li>

                    <li>
                        <Link to="/companies">Companies</Link>
                    </li>

                    {isLoggedIn ? (
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Sidebar */}
            {menuOpen && (
                <div className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 shadow-lg md:hidden">

                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-xl font-bold">Menu</h2>

                        <button
                            className="text-3xl"
                            onClick={() => setMenuOpen(false)}
                        >
                            ×
                        </button>
                    </div>

                    <ul className="flex flex-col p-4 gap-6 text-lg">

                        <li>
                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/companies"
                                onClick={() => setMenuOpen(false)}
                            >
                                Companies
                            </Link>
                        </li>

                        {isLoggedIn ? (
                            <li>
                                <Link
                                    to="/dashboard"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <>
                                <li>
                                    <Link
                                        to="/profile"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        Profile
                                    </Link>
                                </li>

                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-left"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;