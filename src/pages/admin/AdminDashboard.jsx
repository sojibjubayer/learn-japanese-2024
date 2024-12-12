import { IoMenu, IoCloseCircleSharp } from "react-icons/io5";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthenticated = !!localStorage.getItem("token");

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if on the root dashboard page
  const isDashboardRoot = location.pathname === "/dashboard";

  const sidebarLinks = [
    { path: "/dashboard/add-lesson", label: "Add Lessons" },
    { path: "/dashboard/add-vocabulary", label: "Add Vocabularies" },
    { path: "/dashboard/manage-users", label: "Manage Users" },
    { path: "/dashboard/manage-lessons", label: "Lesson Management" },
    { path: "/dashboard/manage-vocabularies", label: "Vocabulary Management" },
    { path: "/dashboard/manage-tutorials", label: "Manage Tutorials" },
  ];

  return (
    <div>
      {/* Admin Navbar */}
      <div className="flex items-center justify-between bg-[#494A8A] h-14 sticky top-0 z-20">
        <div className="flex-1">
          {/* Mobile and Tab Sidebar Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setOpen(!open)} className="btn btn-ghost ml-2">
              {open ? (
                <IoCloseCircleSharp className="text-2xl text-[#FFF4B7]" />
              ) : (
                <IoMenu className="text-2xl text-[#FFF4B7]" />
              )}
            </button>
            <div
              ref={sidebarRef}
              className={`${
                open ? "top-12 left-0" : "top-12 -left-60"
              } duration-1000 absolute border-2 border-[#FFF4B7] bg-[#925892] menu-sm ml-2 z-[1] p-2 rounded-box w-52 text-gray-50`}
            >
              {sidebarLinks.map((item) => (
                <NavLink
                  key={item.path}
                  className={({ isActive }) =>
                    `w-48 p-1 border-b border-[#FCC09B] block ${
                      isActive ? "bg-[#494A8A]" : "hover:bg-[#494A8A]"
                    }`
                  }
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Navbar Center (Desktop View) */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="hidden md:flex items-center font-bold text-[#FFF4B7]">
              <NavLink to="/dashboard">Admin Dashboard</NavLink>
            </div>
            <Link to="/dashboard" className="flex md:hidden text-base items-center mr-10">
              <div className="flex flex-col ml-1 text-[#FFF4B7] font-bold">
                Dashboard
              </div>
            </Link>

            {/* Login/Logout Button */}
            <div className="mr-3">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="border border-[#FFF4B7] px-2 py-[2px] rounded-lg text-[#FFF4B7]"
                >
                  Logout
                </button>
              ) : (
                <div className="border border-[#FFF4B7] px-2 py-[2px] rounded-lg text-[#FFF4B7]">
                  <Link to="/login">Login</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <div className="flex">
        {/* Sidebar for Desktop Only */}
        <aside className="lg:w-[22%] w-full bg-[#925892] h-screen hidden lg:block pl-5 pt-10 font-semibold text-gray-50">
          <div className="space-y-4">
            {sidebarLinks.map((item) => (
              <NavLink
                key={item.path}
                className={({ isActive }) =>
                  `w-full p-1 border-b border-[#FCC09B] block ${
                    isActive ? "bg-[#494A8A]" : "hover:bg-[#494A8A]"
                  }`
                }
                to={item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-[78%]">
          {isDashboardRoot && (
            <div className="text-center mt-10">
              <h1 className="text-xl md:text-2xl font-bold text-[#494A8A]">Welcome, Admin!</h1>
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
