import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import store from "../utils/appStore";
import api from "../api/axios";

const Complaint = () => {
    const [comp, setComp] = useState("");
    const [complains, setComplains] = useState([]);
    const [userId, setUserId] = useState("");
    const email = useSelector((store) => store.auth.email);
    const token = localStorage.getItem("token");

    const handelComplaint = async (e) => {
        e.preventDefault();
        console.log(token);
        if (comp === "") {
            return alert("enter complaint");
        }
        // const newComplaint = {
        //     id: complains.length + 1,
        //     comp,
        //     status: "pending"
        // }

        // setComplains([...complains, newComplaint]);
        const newComplaint = await api.post('/complaint', {
            userId: userId,
            description: comp,
            status: "pending"
        },
            {
                headers: { "x-access-token": token },
            }
        )
        const savedComplaint = newComplaint.data.data;

        // update UI instantly
        setComplains((prev) => [...prev, savedComplaint]);

        setComp("");
    }
    useEffect(() => {
        fetchDetails();
    }, []);
    const fetchDetails = async () => {
        try {
            const user = await api.get(`/user/${email}`)
            console.log(user);
            setUserId(user.data.data.rollNo);
            const complaint = await api.get(`/complaint/${user?.data?.data?.rollNo}`);

            const reqData = complaint.data.data;
            console.log(reqData);
            setComplains(Array.isArray(reqData) ? reqData : reqData ? [reqData] : []);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white h-1/2 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-green-600  mb-6 text-center">
                    Complaint
                </h2>
                <form onSubmit={handelComplaint} className="space-y-5">
                    <input
                        type="text"
                        value={comp}
                        onChange={(e) => setComp(e.target.value)}
                        placeholder="Enter Complaint"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md"
                    >
                        Submit Complaint
                    </button>
                </form>
                {complains && complains?.length > 0 && (
                    <div className="mt-8 w-full max-w-md bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            Your Complains
                        </h3>
                        <ul className="space-y-3">
                            {complains.map((compt) => (
                                <li key={compt?._id} className="p-3 border rounded-lg flex justify-between items-center">
                                    <span>
                                        {compt?.description}
                                    </span>
                                    <span className="text-sm font-semibold text-yellow-600">
                                        {compt?.status}
                                    </span>

                                </li>
                            ))}
                        </ul>
                    </div>
                )}

            </div>


        </div>
    )
}

export default Complaint