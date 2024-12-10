import { useState } from "react";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const AdminNavbar = ({ toggleSidebar }) => {
  // const [loading,setLoading]=useState(true)
  const isAuthenticated = !!localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    // setLoading(false)
  };

  return (
    <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <button
        onClick={toggleSidebar}
        className="md:hidden text-white text-2xl"
        aria-label="Toggle Sidebar"
      >
        <FiMenu />
      </button>
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div className="mr-3">
            {/* Conditionally render Login or Logout button */}
            {isAuthenticated ? (
              <p className="border border-[#FFF4B7] px-2 py-[2px] rounded-lg text-[#FFF4B7]">
                <button onClick={handleLogout}>Logout</button>
              </p>
            ) : (
              <p className="border border-[#FFF4B7] px-2 py-[2px] rounded-lg text-[#FFF4B7]">
                <Link to="/login">Login</Link>
              </p>
            )}
          </div>
    </div>
  );
};

export default AdminNavbar;
