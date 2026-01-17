import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Layers,
  DollarSign,
  BarChart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    console.log("Logout button clicked", e); // Check if this logs when clicking
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event bubbling

    if (window.confirm("Are you sure you want to logout?")) {
      console.log("User confirmed logout");
      try {
        console.log("Before logout");
        await logout();
        console.log("After logout");
        navigate("/login");
        window.location.reload();
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  };
  return (
    <aside className="w-64 bg-[#E1E1DC] dark:bg-[#43433F] m-5.5 p-4 mr-0 hidden lg:flex flex-col justify-between rounded-xl">
      {/* Logo */}
      <div>
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="w-24 mb-6" />
        </div>

        <nav className="space-y-2">
          <p className="text-lg font-semibold dark:text-[#FBFBF5] uppercase mb-2">
            Menu
          </p>

          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            to="/dashboard"
          />
          <SidebarItem icon={<Layers />} label="Stocks" to="/stocks" />
          <SidebarItem
            icon={<DollarSign />}
            label="Investment"
            to="/investment"
          />
          <SidebarItem icon={<BarChart />} label="Sales" to="/sales" />
          <SidebarItem icon={<Users />} label="Team" to="/team" />

          <p className="text-lg font-semibold dark:text-[#FBFBF5] uppercase mt-6 mb-2">
            General
          </p>

          <SidebarItem icon={<Settings />} label="Setting" to="/settings" />
          <SidebarItem icon={<HelpCircle />} label="Help" to="/help" />
          <div
            onClick={handleLogout}
            className="flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition dark:text-[#FBFBF5] 
        ${
          isActive
            ? "border-b-2 border-b-[#22231F] dark:border-b-[#FBFBF5] font-semibold"
            : "hover:border-b-2 hover:border-b-[#22231F] dark:hover:border-b-[#FBFBF5]"
        }
      `
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
