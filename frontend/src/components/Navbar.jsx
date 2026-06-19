import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Navbar = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return(
        <div className="fixed top-0 left-0 w-full bg-gray-900 text-white px-8 py-4 flex justify-between items-center z-50">
            <h1 className="text-2xl font-bold">Career🔗Connect</h1>
            <ul className="flex gap-6">
                <li className="cursor-pointer"> <Link to="/">Home</Link></li>
                <li className="cursor-pointer"><Link to="/companies">Companies</Link></li>

                {
                    isLoggedIn ? (
                        
                        <li className="cursor-pointer"><Link to="/dashboard">Dashboard</Link></li>
                        
                    ) : (
                        <li className="cursor-pointer"><Link to="/login">Login</Link></li>
                    )  
                }
               
            </ul>
        </div>
    );
};

export default Navbar;