import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <nav className="flex justify-between p-4 border-b border-gray-200">
            <div>
                <Link to="/" className="font-bold text-xl">TechRabbit</Link>
            </div>
            <div className="flex gap-4 items-center">
                <Link to="/" className="hover:text-blue-600">Home</Link>
                {token ? (
                    <>
                        <Link to="/admin/dashboard" className="hover:text-blue-600">Dashboard</Link>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="hover:text-blue-600">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
