import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-[#FCE4EC] text-[#4A4A4A] px-4">
      <div className="flex justify-between items-center h-14 font-semibold">
        {/* Logo Name */}
        <Link to="/" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">Learn 日本語</Link>

        {/* Menu Icon for Mobile */}
        <div className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <button className="text-2xl bg-white text-[4A4A4A] mt-1">
            {menuOpen ? <RxCross2 /> : <IoMdMenu />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute top-14 left-0 w-full bg-[#FCE4EC] sm:static sm:w-auto sm:flex sm:flex-row sm:gap-20 flex flex-col gap-5 sm:items-center sm:bg-transparent p-4 sm:p-0 transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden sm:flex"
          }`}
        >
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "block border-b-2 border-[#4A4A4A] pl-3 p-1 rounded-md w-20 mx-auto bg-white"
                : "block border-b-2 border-[#4A4A4A] pl-3 p-1 rounded-md w-20 mx-auto"
            }
            to="/Lessons"
            onClick={() => setMenuOpen(false)} 
          >
            Lessons
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "block border-b-2 border-[#4A4A4A] pl-2 p-1 rounded-md w-20 mx-auto bg-white"
                : "block border-b-2 border-[#4A4A4A] pl-2 p-1 rounded-md w-20 mx-auto"
            }
            to="/Tutorials"
            onClick={() => setMenuOpen(false)} 
          >
            Tutorials
          </NavLink>
        </div>

        {/* Login / Logout Button */}
        <div className="mr-3">
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false); 
              }}
              className="border border-[#4A4A4A] px-2 py-[2px] rounded-lg text-[#4A4A4A]"
            >
              Logout
            </button>
          ) : (
            <div className="border border-[#4A4A4A] px-2 py-[2px] rounded-lg text-[#4A4A4A]">
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
