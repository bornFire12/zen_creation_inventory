import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import HeaderUserCard from "../../components/HeaderUserCard";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Mail,
  Globe,
  LogOut,
  ChevronRight,
  Search,
} from "lucide-react";

export default function SettingsPage() {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(`/settings/${path}`);
  };
  return (
    <Layout>
      <HeaderUserCard />

      <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-6">
          <main className="flex-1">
            <div className="bg-[#FBFBF5] dark:bg-[#22231F] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-col gap-3 w-full ">
                  <h1 className="text-2xl font-semibold">Settings</h1>
                  <button
                    onClick={() => navigateTo("profile")}
                    className="text-left  border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-300  "
                  >
                    PROFILE SETTINGS
                  </button>
                  <button
                    onClick={() => navigateTo("security")}
                    className="text-left   border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-300  "
                  >
                    SECURITY SETTINGS
                  </button>
                  <button
                    onClick={() => navigateTo("notification")}
                    className="text-left   border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-300  "
                  >
                    NOTIFICATION SETTINGS
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}
