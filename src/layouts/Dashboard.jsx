import {
  FaCalendar,
  FaChartLine,
  FaEye,
  FaHeadSideCoughSlash,
  FaHome,
  FaList,
  FaNotesMedical,
  FaRegBookmark,
  
  FaStickyNote,
  FaUpload,
  FaUsers,
} from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { GrLogout } from "react-icons/gr";
import { Link, NavLink, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { AiOutlineBars } from "react-icons/ai";
import { useState } from "react";

const Dashboard = () => {
  const [isActive, setActive] = useState(false);
  const { logOut } = useAuth();
  const [role, isLoading] = useRole();

  // Sidebar Toggle Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  if (isLoading || !role) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-slate-300 text-gray-900 flex justify-between md:hidden">
        <div className="block cursor-pointer p-4 font-bold">
          <Link to="/">
            <img
              src="https://i.ibb.co/s1XHQPZ/stayvission.png"
              alt="logo"
              width="30"
              height="30"
            />
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Main Layout */}
      <div className="relative min-h-screen flex">
        {/* Sidebar */}
        <div
          className={`z-10 md:fixed md:w-64 flex flex-col justify-between overflow-x-hidden bg-gray-100 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            isActive ? "-translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition duration-200 ease-in-out`}
        >
          <div className="flex flex-col min-h-screen text-gray-900 bg-slate-300">
            <div>
              <ul className="menu md:gap-4 md:font-normal md:px-2 md:py-4 lg:text-md lg:gap-6 lg:font-medium lg:px-4 lg:py-6 lg:text-md">
                {role === "admin" && (
                  <>
                    <li>
                      <NavLink end to="/dashboard">
                      <FaChartLine /> Statistics
                      </NavLink>
                    </li>
                 

                    <li>
                      <NavLink to="/dashboard/viewSession">
                        <FaList /> View All Sessions
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/view-all-materials">
                        <FaEye /> All Materials
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/manage-users">
                        <FaUsers /> Manage Users
                      </NavLink>
                    </li>
                  </>
                )}

                {role === "student" && (
                  <>
                    <li>
                      <NavLink end to="/dashboard">
                      <FaChartLine /> Statistics
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/myBooking">
                        <FaRegBookmark /> My Booking
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/createNotes">
                        <FaNotesMedical /> Create Notes
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/manageNotes">
                        <FaStickyNote /> Manage Notes
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/studyMaterials">
                        <FaHeadSideCoughSlash /> View Study Materials
                      </NavLink>
                    </li>
                  </>
                )}

                {role === "tutor" && (
                  <>
                    <li>
                      <NavLink end to="/dashboard">
                      <FaChartLine /> Statistics
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/createStudySession">
                        <FaCalendar /> Create Study Session
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/viewStudySession">
                        <FaList /> View all Sessions
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/uploadMaterials">
                        <FaUpload /> Upload Materials
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/dashboard/viewMaterials">
                        <FaEye /> View all Materials
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Shared Nav Links */}
            <div className="divider"></div>

            <div>
              <ul className="menu md:gap-4 md:font-normal md:px-2 md:py-4 lg:text-md lg:gap-6 lg:font-medium lg:px-4 lg:py-6 lg:text-md">
                <li>
                  <NavLink to="/">
                    <FaHome /> Home
                  </NavLink>
                </li>

                {/* Profile Menu */}
                <li>
                  <NavLink to="/dashboard/profile">
                    <FcSettings /> Profile
                  </NavLink>
                </li>

                {/* Logout Button */}
                <li>
                  <button
                    onClick={logOut}
                    className="flex w-full items-center px-4 py-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
                  >
                    <GrLogout className="w-5 h-5" />
                    <span className="mx-4 font-medium">Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 md:ml-64 p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
