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
        setMenuOpen(false);
    };

    return (
        <>
            {/* Top Navbar */}
            <div className="fixed top-0 left-0 w-full bg-gray-900 text-white px-4 md:px-8 py-4 flex justify-between items-center z-50">

                <h1 className="text-xl md:text-2xl font-bold">
                    Career🔗Connect
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 items-center">
                    <li>
                        <Link to="/" className="hover:text-gray-300 transition">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link to="/companies" className="hover:text-gray-300 transition">
                            Companies
                        </Link>
                    </li>

                    {isLoggedIn ? (
                        <li>
                            <Link to="/dashboard" className="hover:text-gray-300 transition">
                                Dashboard
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="hover:text-gray-300 transition">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-3xl"
                    onClick={() => setMenuOpen(true)}
                >
                    ☰
                </button>
            </div>

            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-56 bg-gray-900 text-white z-50 shadow-2xl transform transition-transform duration-300 md:hidden ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >

                {/* Header */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
                    <h2 className="text-lg font-bold">
                        Menu
                    </h2>

                    <button
                        className="text-3xl"
                        onClick={() => setMenuOpen(false)}
                    >
                        ×
                    </button>
                </div>

                {/* Menu Items */}
                <div className="p-3 flex flex-col gap-2">

                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="block w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                    >
                        Home
                    </Link>

                    <Link
                        to="/companies"
                        onClick={() => setMenuOpen(false)}
                        className="block w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                    >
                        Companies
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className="block w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="block w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="block w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                        >
                            Login
                        </Link>
                    )}
                </div>

            </div>
        </>
    );
};

export default Navbar;