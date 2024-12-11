import { NavLink } from "react-router-dom";
import { AiFillBook, AiOutlineUser } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

const Sidebar = ({ closeSidebar }) => {
  const menuItems = [
    { name: "Lessons", icon: AiFillBook, path: "/dashboard/lessons" },
    { name: "Add Lessons", icon: AiFillBook, path: "/dashboard/add-lesson" },
    { name: "Add Vocabularies", icon: FiSettings, path: "/dashboard/add-vocabulary" },
    { name: "Manage Users", icon: AiOutlineUser, path: "/dashboard/manage-users" },
    { name: "Lesson Management", icon: AiFillBook, path: "/dashboard/manage-lessons" },
    { name: "Vocabulary Management", icon: FiSettings, path: "/dashboard/manage-vocabularies" },
  ];

  return (
    <div className="p-4 space-y-4 h-screen bg-gray-800 text-white overflow-y-auto">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className="flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-700"
          onClick={closeSidebar} // Close on item click for mobile
        >
          <item.icon />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
