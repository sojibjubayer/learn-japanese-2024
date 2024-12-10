import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("token");

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#032F30] text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to={isAdmin ? "/dashboard" : "/lessons"}>~日本~ Learn</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="block md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Links (Desktop and Tablet) */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-[#032F30] md:flex items-center md:gap-6 z-50`}
        >
          {isAdmin ? (
            <>
              {/* Admin Links */}
              <Link
                to="/dashboard"
                className="block md:inline-block px-6 py-2 md:py-0 hover:underline"
              >
                Dashboard
              </Link>
              <Link
                to="/manage-users"
                className="block md:inline-block px-6 py-2 md:py-0 hover:underline"
              >
                Manage Users
              </Link>
              <Link
                to="/lesson-management"
                className="block md:inline-block px-6 py-2 md:py-0 hover:underline"
              >
                Lessons
              </Link>
            </>
          ) : (
            <>
              {/* User Links */}
              <Link
                to="/lessons"
                className="block md:inline-block px-6 py-2 md:py-0 hover:underline"
              >
                Lessons
              </Link>
              <Link
                to="/tutorials"
                className="block md:inline-block px-6 py-2 md:py-0 hover:underline"
              >
                Tutorials
              </Link>
            </>
          )}
          {/* Logout Button */}
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
      </div>
    </nav>
  );
};

export default Navbar;
