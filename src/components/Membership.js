import React, { useEffect, useState } from "react";
import { FaDumbbell, FaClock, FaUser } from "react-icons/fa";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Membership = () => {
    const [gymId, setGymId] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [timeSlot, setSlot] = useState("");

    const [gyms, setGyms] = useState([]);
    const navigate=useNavigate();

    const slots = [
        "6:00 AM - 7:00 AM",
        "7:00 AM - 8:00 AM",
        "5:00 PM - 6:00 PM",
        "6:00 PM - 7:00 PM",
    ];
    useEffect(() => {
        fetchApi();
    }, [])

    const fetchApi = async () => {
        try {
            const fetchGym = await api.get('/gym');
            console.log(fetchGym)
            setGyms(fetchGym.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePay = async () => {
        if (!gymId || !rollNo || !timeSlot) {
            alert("Please fill all details before proceeding!");
            return;
        }
       
        const token = localStorage.getItem('token');
        // console.log(token);
        console.log("Sending token:", token);
        const membership = await api.post('/membership/create', {
            rollNo,
            gymId,
            timeSlot
        },
            {
                headers: { "x-access-token": token },
            })
        console.log(membership);
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID,
            amount: (membership.data.data.amount) / 100,
            currency: "INR",
            name: "Gym Membership",
            description: "Membership Payment",
            order_id: membership.data.data.orderId,
            handler: async function (response) {
                // This runs on successful payment
                console.log("Payment success:", response);

                alert("Payment successful!");
                
                await api.post(
                    "/membership/verify-payment", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                },
                    { headers: { "x-access-token": token } }
                );
            },
            prefill: {
                rollNo: membership.data.data.rollNo,
                membershipId: membership.data.data._id
            },
            theme: {
                color: "#3399cc",
            },
        }
        const razor = new window.Razorpay(options);
        razor.open();
        alert(`Proceeding to payment for Roll No ${rollNo}`);
        navigate('/student')
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex justify-center items-center p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
                    Gym Membership Registration
                </h1>

                {/* Gym Select */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                        <FaDumbbell className="text-green-600" /> Select Gym
                    </label>
                    <select
                        value={gymId}
                        onChange={(e) => setGymId(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">-- Choose Gym --</option>
                        {gyms.map((g) => (
                            <option key={g.id} value={g.gymId}>
                                {console.log(g.gymId)}
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Roll No */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                        <FaUser className="text-green-600" /> Roll Number
                    </label>
                    <input
                        type="text"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="Enter Roll No"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                </div>

                {/* Time Slot */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                        <FaClock className="text-green-600" /> Select Time Slot
                    </label>
                    <select
                        value={timeSlot}
                        onChange={(e) => setSlot(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                        <option value="">-- Choose Slot --</option>
                        {slots.map((s, idx) => (
                            <option key={idx} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pay Button */}
                <button
                    onClick={handlePay}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition shadow-lg"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default Membership;
