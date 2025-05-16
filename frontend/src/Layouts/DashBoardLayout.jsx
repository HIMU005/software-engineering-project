import { Outlet } from "react-router-dom";
import Sidebar from "../components/DashBoard/Sidebar";
import Footer from "../components/Shared/Footer";
import UserLogo from "../components/Shared/UserLogo";

const DashBoardLayout = () => {
    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar />
            <div className="flex-1 md:ml-64">
                <div className="p-5">
                    <div className="flex justify-end">   <UserLogo /></div>

                    <Outlet />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;