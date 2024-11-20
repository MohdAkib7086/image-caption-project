import React, { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./sideBar.scss";

// import  from "../assets/images/lumiq-log.png";
import NewChat from "../components/NewChat";
import MessageState from "../context/MessageState";

function Sidebar({ collapsed, setCollapsed, sidebarItems }) {
  console.log(sidebarItems, "hello");
  const [openDropdowns, setOpenDropdowns] = useState([]);

  const isDropdownOpen = (index) => {
    return openDropdowns.includes(index);
  };

  const renderSidebarItems = (items, parentIndex = null) => {
    return items.map((item, index) => (
      <li key={index} className={`truncate my-2 ${item.children ? "dropdown" : ""}`}>
        {item.children ? (
          <div>
            <ul className={`ml-12 ${isDropdownOpen(index) ? "" : "hidden"}`}>{renderSidebarItems(item.children, index)}</ul>
          </div>
        ) : (
          <NavLink to={item.path} className={({ isActive }) => `flex px-3 py-2 rounded-md text-base font-medium ${isActive ? "bg-indigo-400 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}>
            <span className={`${!collapsed ? "opacity-0" : ""}`}> {item.label}</span>
          </NavLink>
        )}
      </li>
    ));
  };

  return (
    <aside className={`h-screen left-sidebar-col relative py-4 overflow-hidden px-3 bg-[#62626C]  ${collapsed ? "sidebar-open w-64" : "w-[4.5rem]"}`} aria-label="Sidebar">
      <div className="flex flex-col justify-between items-center h-full">
        {/*  */}
        <div className="overflow-y-auto z-10 relative sidebar-item h-full">
          <ul className="space-y-2 overflow-x-hidden">{renderSidebarItems(sidebarItems)}</ul>
          <NewChat />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
