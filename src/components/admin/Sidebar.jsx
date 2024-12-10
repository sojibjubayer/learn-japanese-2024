import { NavLink } from "react-router-dom";
import { AiFillBook, AiOutlineUser } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

const Sidebar = ({ closeSidebar }) => {
  const menuItems = [
    { name: "Manage Lessons", icon: AiFillBook, path: "/admin/manage-lessons" },
    { name: "Add Lesson", icon: AiFillBook, path: "/admin/add-lesson" },
    { name: "Manage Vocabularies", icon: FiSettings, path: "/admin/manage-vocabularies" },
    { name: "Add Vocabulary", icon: FiSettings, path: "/admin/add-vocabulary" },
    { name: "Manage Users", icon: AiOutlineUser, path: "/admin/manage-users" },
  ];

  return (
    <div className="p-4 space-y-4 text-white">
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
