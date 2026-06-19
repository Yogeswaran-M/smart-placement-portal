import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if(!confirmLogout){
            return;
        }

        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");

        navigate("/login");
    };

    return (
        <nav className="bg-black text-white px-6 py-4 flex justify-between">

            <h1 className="font-bold text-2xl">
                Admin🔗Panel
            </h1>

            <div className="flex gap-6 mt-1">

                <Link to="/admin/dashboard">
                    Dashboard
                </Link>

                <Link to="/admin/companies">
                    Companies
                </Link>

                <Link to="/admin/application">
                    Applications
                </Link>

                <button className="mb-1" onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default AdminNavbar;