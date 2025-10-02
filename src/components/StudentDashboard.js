import React, { useEffect, useState } from "react";
import { FaUserCircle, FaDumbbell, FaExclamationCircle, FaExchangeAlt, FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/authSlice";
import api from "../api/axios"
import { persistor } from "../utils/appStore";
// import Membership from "./Membership";

const StudentDashboard = () => {
    const [user,setUser]=useState("");
    const [userMembership,setUserMembership]=useState("");
    const email=useSelector(store=>store.auth.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handelLogout = () => {
        try {
            localStorage.removeItem("token");
            dispatch(logout());
            persistor.purge(); 
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    // const student = {
    //     name: "Kushagra Kapoor",
    //     rollNo: "2105188",
    //     membership: "Active till 31 Dec 2025",
    // };
    useEffect(()=>{
        fetchAPi();
    },[])

    const fetchAPi=async()=>{
        try {
            console.log("email:",email);
            const data=await api.get(`/user/${email}`);
            const userData = data.data.data;
            console.log(data)

            setUser(userData);
            console.log("user:",user);
            if(userData.membershipId){
                 const memData=await api.get(`/membership/mem/${userData.membershipId}`);
                 const membership=memData.data.data
                 console.log(membership);
                setUserMembership(membership);
            
            }
           
        } catch (error) {
            console.log(error);
        }
    }

    return user?(
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col items-center p-6">
            {/* Main Card */}
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-8">
                {/* Profile Section */}
                <div className="flex flex-col items-center text-center">
                    <FaUserCircle className="text-green-600 text-6xl mb-3" />
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, {user?user.name:"name"} 👋</h1>
                    <p className="text-gray-600 text-lg">Roll No: <span className="font-semibold">{user?user.rollNo:"rollNo"}</span></p>
                    <p className="text-green-700 text-sm mt-1">📅 {userMembership===""?"none":"valid till:-"+ userMembership.endDate.split('T')[0]}</p>
                </div>

                {/* Divider */}
                <div className="my-6 border-b border-gray-200"></div>

                {/* QR Code Section */}
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-300 p-1 rounded-xl shadow-md">
                        <div className="bg-white p-4 rounded-lg flex flex-col items-center">
                            <img
                                src={userMembership.QRCode}
                                alt="QR Code"
                                className="rounded-md shadow-md"
                            />
                            <p className="text-gray-600 text-sm mt-2">Scan at gym entry</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
                    <Link to='/membership'>
                        <div className="p-4 bg-green-100 rounded-xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
                            <FaDumbbell className="text-green-600 text-3xl mx-auto mb-2" />
                            <p className="font-semibold text-gray-800">Membership</p>
                        </div>
                    </Link>

                    <Link to='/complaint'>
                        <div className="p-4 bg-red-100 rounded-xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
                            <FaExclamationCircle className="text-red-600 text-3xl mx-auto mb-2" />
                            <p className="font-semibold text-gray-800">Complaint</p>
                        </div>
                    </Link>

                    <Link to='/gymChange'>
                        <div className="p-4 bg-yellow-100 rounded-xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
                            <FaExchangeAlt className="text-yellow-600 text-3xl mx-auto mb-2" />
                            <p className="font-semibold text-gray-800">Gym Change</p>
                        </div>
                    </Link>

                    <Link to='/events'>
                        <div className="p-4 bg-blue-100 rounded-xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer">
                            <FaCalendarAlt className="text-blue-600 text-3xl mx-auto mb-2" />
                            <p className="font-semibold text-gray-800">Events</p>
                        </div>
                    </Link>
                </div>

                {/* Logout */}
                <div className="flex justify-center mt-8">
                    <button onClick={handelLogout} className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-700 shadow">
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    ):( <div className="text-center p-10">Loading...</div>);
};

export default StudentDashboard;
