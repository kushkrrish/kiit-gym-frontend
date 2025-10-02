import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SIgnup";
// import App from "./App";
// import Home from "./components/Home";
import ProtectedRoute from "./components/Protected";
import App from "./App";
import StudentDashboard from "./components/StudentDashboard";
import Membership from "./components/Membership";
import GymChange from "./components/Gymchange";
import Complaint from "./components/Complaint";
import Events from "./components/Event";
import Admin from "./components/Admin";
import QRScannerComponent from "./components/QRScannerComponent ";
import GymChangeRequest from "./components/GymChangeRequest";
import ComplaintRequests from "./components/ComplaintRequest";
import Reports from "./components/Reports";
const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: '/login', element: <Login /> },
            { path: '/signup', element: <Signup /> },
            {
                element: <ProtectedRoute />,
                children: [

                    { path: '/student', element: <StudentDashboard /> },
                    {path:'/membership',element:<Membership/>},
                    {path:'/gymChange',element:<GymChange/>},
                    {path:'/complaint',element:<Complaint/>},
                    {path:'/events',element:<Events/>},
                    {path:'/admin',element:<Admin/>},
                    {path:'/admin/scan-entry',element:<QRScannerComponent/>},
                    {path:'/admin/GymChangeRequest',element:<GymChangeRequest/>},
                    {path:'/admin/Complaints',element:<ComplaintRequests/>},
                    {path:'/admin/reports',element:<Reports/>}
                ]
            }
        ]
    }
])

export default appRouter