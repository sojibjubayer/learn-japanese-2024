import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import {jwtDecode} from "jwt-decode"; // You need to install this package

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return;

      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token); // Decode token to get user id

      try {
        const response = await fetch(`https://learn-japanese-backend.vercel.app/api/user/${decodedToken.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserImage(data.image); 
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-[#FCE4EC] text-[#4A4A4A] px-4">
      <div className="flex justify-between items-center h-14 font-semibold">
        <Link to="/" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
          Learn 日本語
        </Link>

        {/* Mobile Menu Icon */}
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
            to="/Lessons"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block border-b-2 border-[#4A4A4A] pl-3 p-1 rounded-md w-20 mx-auto bg-white"
                : "block border-b-2 border-[#4A4A4A] pl-3 p-1 rounded-md w-20 mx-auto"
            }
          >
            Lessons
          </NavLink>

          <NavLink
            to="/Tutorials"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? "block border-b-2 border-[#4A4A4A] pl-2 p-1 rounded-md w-20 mx-auto bg-white"
                : "block border-b-2 border-[#4A4A4A] pl-2 p-1 rounded-md w-20 mx-auto"
            }
          >
            Tutorials
          </NavLink>
        </div>

        {/* User Profile / Logout */}
        <div className="flex items-center gap-2 md:gap-3">
          {isAuthenticated && userImage && (
            <img
              src={userImage} // User image from the database
              alt="User Profile"
              className="w-8 h-8 rounded-full border border-[#4A4A4A] hidden md:flex"
            />
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
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
