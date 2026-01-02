import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import HeaderUserCard from "../../components/HeaderUserCard";
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

/* ---------------- SETTINGS MENU CONFIG ---------------- */

const settingsMenu = [
  {
    id: "profile",
    title: "Profile",
    icon: <User size={18} />,
    description: "Update your profile information",
  },
  {
    id: "security",
    title: "Security",
    icon: <Shield size={18} />,
    description: "Change password and security settings",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: <Bell size={18} />,
    description: "Configure your notification preferences",
  },
  {
    id: "billing",
    title: "Billing",
    icon: <CreditCard size={18} />,
    description: "Manage subscription and payment methods",
  },
  {
    id: "privacy",
    title: "Privacy",
    icon: <Lock size={18} />,
    description: "Control your privacy settings",
  },
  {
    id: "email",
    title: "Email",
    icon: <Mail size={18} />,
    description: "Update email preferences",
  },
  {
    id: "language",
    title: "Language & Region",
    icon: <Globe size={18} />,
    description: "Change language and regional settings",
  },
];

/* ---------------- MAIN PAGE ---------------- */

export default function SettingsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [searchQuery, setSearchQuery] = useState("");

  /* Sync tab with URL */
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path && path !== "settings") {
      setActiveTab(path);
    }
  }, [location]);

  /* Filter sidebar menu */
  const filteredMenu = settingsMenu.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTab = settingsMenu.find((item) => item.id === activeTab);

  return (
    <Layout>
      <HeaderUserCard />

      <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-6 rounded-xl">
        <div className="flex flex-col md:flex-row gap-6">
          {/* ---------------- SIDEBAR ---------------- */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-[#FBFBF5] dark:bg-[#22231F] rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-3">Settings</h2>

              {/* Search */}
              <div className="relative mb-4">
                <Search
                  size={16}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              {/* Menu */}
              <nav className="space-y-1 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
                {filteredMenu.map((item) => (
                  <Link
                    key={item.id}
                    to={`/settings/${item.id}`}
                    className={`flex items-center justify-between p-3 rounded-lg transition ${
                      activeTab === item.id
                        ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-xs opacity-60">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={16} />
                  </Link>
                ))}

                {/* Logout */}
                <button className="w-full flex items-center gap-3 p-3 mt-4 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut size={18} />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* ---------------- CONTENT ---------------- */}
          <main className="flex-1">
            <div className="bg-[#FBFBF5] dark:bg-[#22231F] rounded-xl p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-semibold">
                    {currentTab?.title || "Settings"}
                  </h1>
                  <p className="opacity-60">
                    {currentTab?.description || "Manage your account settings"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button className="px-4 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700">
                    Cancel
                  </button>
                  <button className="px-4 py-2 text-sm rounded-lg bg-yellow-300 text-[#22231F]">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="border-t pt-6 dark:border-gray-700">
                <SettingsSection activeTab={activeTab} />
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

/* ---------------- SETTINGS CONTENT ---------------- */

const SettingsSection = ({ activeTab }) => {
  switch (activeTab) {
    case "profile":
      return <ProfileSettings />;
    case "security":
      return <SecuritySettings />;
    case "notifications":
      return <NotificationSettings />;
    case "billing":
      return <div>Billing settings coming soon</div>;
    case "privacy":
      return <div>Privacy settings coming soon</div>;
    case "email":
      return <div>Email settings coming soon</div>;
    case "language":
      return <div>Language settings coming soon</div>;
    default:
      return null;
  }
};

/* ---------------- SECTION COMPONENTS ---------------- */

const ProfileSettings = () => (
  <div className="space-y-4">
    <input className="w-full p-2 rounded border" placeholder="First Name" />
    <input className="w-full p-2 rounded border" placeholder="Last Name" />
    <input className="w-full p-2 rounded border" placeholder="Email" />
    <textarea className="w-full p-2 rounded border" placeholder="Bio" />
  </div>
);

const SecuritySettings = () => (
  <div className="space-y-4">
    <input
      type="password"
      className="w-full p-2 rounded border"
      placeholder="Current Password"
    />
    <input
      type="password"
      className="w-full p-2 rounded border"
      placeholder="New Password"
    />
    <input
      type="password"
      className="w-full p-2 rounded border"
      placeholder="Confirm Password"
    />
  </div>
);

const NotificationSettings = () => (
  <div className="space-y-3">
    <label className="flex items-center gap-3">
      <input type="checkbox" defaultChecked />
      Email Notifications
    </label>
    <label className="flex items-center gap-3">
      <input type="checkbox" />
      Security Alerts
    </label>
  </div>
);
