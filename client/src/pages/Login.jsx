import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginApi } from "../features/auth/authApi.js"
import { loginStart, loginSuccess, loginFailure } from "../features/auth/authSlice"

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch(loginStart());
        try {
            const data = await loginApi(formData);
            if (data && data.token) {
                dispatch(loginSuccess(data.token));
            } else {
                dispatch(loginFailure("Invalid response from server"));
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed";
            dispatch(loginFailure(errorMessage));
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border border-gray-300 p-8 w-96 rounded-lg">
                <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

                {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 disabled:bg-blue-400"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login