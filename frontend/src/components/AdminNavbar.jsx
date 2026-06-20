import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminNavbar = () => {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }

        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/login");
    };

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between items-center relative">

            <h1 className="font-bold text-2xl">
                Admin🔗Panel
            </h1>

            {/* Desktop Menu */}

            <div className="hidden md:flex gap-6 items-center">

                <Link to="/admin/dashboard">
                    Dashboard
                </Link>

                <Link to="/admin/companies">
                    Companies
                </Link>

                <Link to="/admin/application">
                    Applications
                </Link>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

            {/* Mobile Hamburger */}

            <button
                className="md:hidden text-3xl"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            {/* Mobile Menu */}

            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-black border-t border-gray-700 md:hidden z-50">

                    <div className="flex flex-col">

                        <Link
                            to="/admin/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className="px-6 py-4 border-b border-gray-700"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/admin/companies"
                            onClick={() => setMenuOpen(false)}
                            className="px-6 py-4 border-b border-gray-700"
                        >
                            Companies
                        </Link>

                        <Link
                            to="/admin/application"
                            onClick={() => setMenuOpen(false)}
                            className="px-6 py-4 border-b border-gray-700"
                        >
                            Applications
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="text-left px-6 py-4"
                        >
                            Logout
                        </button>

                    </div>

                </div>
            )}

        </nav>
    );
};

export default AdminNavbar;