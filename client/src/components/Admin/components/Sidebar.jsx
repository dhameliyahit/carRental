import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends, FaCar, FaCog, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    { name: "Users", path: "/admin/users", icon: <FaUserFriends /> },
    { name: "Cars", path: "/admin/cars", icon: <FaCar /> },
    { name: "Booking", path: "/admin/bookings", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-base-100 shadow-xl p-4 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
        <ul className="menu gap-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-2 rounded-lg 
                  ${pathname === item.path ? "bg-primary text-white" : "hover:bg-base-200"}`}
                onClick={() => setIsOpen(false)} // close on click (mobile)
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
