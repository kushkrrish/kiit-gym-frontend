import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { login } from "../utils/authSlice";

const Login = () => {
    const [error, setError] = useState("");
    const password = useRef();
    const email = useRef();
    const role = useRef();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handelLogin = async (e) => {
        const payload = {
            email: email.current.value,
            password: password.current.value,
            role: role.current.value
        }
        e.preventDefault();
        try {
            const res = await api.post('/user/signin', payload);
            console.log("Login success:", res.data);
            localStorage.setItem("token", res.data.data);
            localStorage.setItem("email",email.current.value)
            localStorage.setItem("role",role.current.value)
            dispatch(login({
                  // depends on what your backend returns
                token: res.data.data,
                email:email.current.value

            }))
            if(role.current.value==="student"){
                navigate("/student");
            }
            else{
                navigate("/admin");
            }

        } catch (error) {
            console.error("Login failed:", error);
            setError("Invalid email or password. Try again.");
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Login</h2>

                {error && <p className="text-red-500 text-center mb-3">{error}</p>}
                <form onSubmit={handelLogin}>
                    <input
                        type="email"
                        ref={email}
                        placeholder="Email"
                        className="w-full p-3 mb-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        ref={password}
                        placeholder="Password"
                        className="w-full p-3 mb-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                    <select
                        ref={role}
                        className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
                    >
                        Login
                    </button>

                </form>
                <p className="text-center text-gray-600 mt-4">
                    New user?{" "}
                    <Link to="/signup" className="text-green-700 font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login;