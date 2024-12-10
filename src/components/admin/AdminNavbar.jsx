import { FiMenu, FiLogOut } from "react-icons/fi";

const AdminNavbar = ({ toggleSidebar }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
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
      <button
        onClick={handleLogout}
        className="flex items-center bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
      >
        <FiLogOut className="mr-2" /> Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
