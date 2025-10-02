import { useRef, useState } from "react";
import api from "../api/axios";

import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const rollNo = useRef();
  const role = useRef();
  const employeeId = useRef();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("student");

  const handelSignIn = async (e) => {
    e.preventDefault();
    const payload = {
      role: role.current.value,
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    }

    if (selectedRole === "student") {
      payload.rollNo = rollNo.current.value
    } if(selectedRole==="admin") {
      payload.employeeId = employeeId.current.value
    }
    try {
      const res = await api.post("/user/signup", payload)
      console.log(res);


      navigate('/login');
      alert("Signup Successful!");
    } catch (error) {
      console.log(error);
      alert("Signup Failed! " + (error.response?.data?.message || "Try again"))
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
          Create Account
        </h2>
        <form>
          <input
            type="text"
            ref={name}
            placeholder="Name"
            className="w-full p-3 mb-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
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
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full p-3 mb-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          {selectedRole === "student" && (
            <input
              type="text"
              ref={rollNo}
              placeholder="Roll No"
              className="w-full p-3 mb-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          )}
          {selectedRole === "admin" && (
            <input
              type="text"
              ref={employeeId}
              placeholder="Employee ID"
              className="w-full p-3 mb-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition" onClick={handelSignIn}
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600 mt-4">
            already user?{" "}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
