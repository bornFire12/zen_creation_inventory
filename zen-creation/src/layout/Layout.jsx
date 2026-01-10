import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FBFBF5] dark:bg-[#22231F] flex dark:text-[#FBFBF5]">
      <Sidebar />

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
