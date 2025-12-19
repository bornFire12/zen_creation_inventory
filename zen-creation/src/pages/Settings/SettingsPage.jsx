import { useState } from "react";

export default function SettingsPage() {
  const [openSection, setOpenSection] = useState("profile");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen flex bg-[#2e2e2e]">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-[#e6e5e1] flex-col p-6">
        <img src="/logo.png" alt="Logo" className="w-24 mb-8" />

        <h3 className="text-sm font-semibold mb-4">Menu</h3>
        <nav className="space-y-3 text-sm">
          <p>📊 Dashboard</p>
          <p>📦 Stocks</p>
          <p>💰 Investment</p>
          <p>🛒 Sales</p>
          <p>👥 Team</p>
        </nav>

        <h3 className="text-sm font-semibold mt-8 mb-4">General</h3>
        <nav className="space-y-3 text-sm">
          <p className="font-semibold">⚙️ Setting</p>
          <p>❓ Help</p>
          <p>🚪 Logout</p>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-[#f7f5ef] p-6 md:p-10 rounded-l-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">Prason Tuladhar</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>

          <button className="bg-red-600 text-white px-4 py-1 text-sm rounded">
            Dark
          </button>
        </div>

        {/* SETTINGS TITLE */}
        <h1 className="text-xl font-semibold mb-4">Settings</h1>

        {/* SEARCH + NOTIFICATION */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search Items"
            className="px-4 py-2 rounded border w-60 text-sm"
          />
          <span className="text-xl">🔔</span>
        </div>

        {/* SETTINGS SECTIONS */}
        <div className="space-y-4">
          {/* Profile Setting */}
          <div className="bg-white rounded-lg shadow">
            <button
              onClick={() => toggleSection("profile")}
              className="w-full flex justify-between items-center px-6 py-4 font-medium"
            >
              Profile Setting
              <span>{openSection === "profile" ? "▲" : "▼"}</span>
            </button>

            {openSection === "profile" && (
              <div className="px-6 pb-6 text-sm text-gray-600">
                Change profile picture, name, email and phone number.
              </div>
            )}
          </div>

          {/* Security Setting */}
          <div className="bg-white rounded-lg shadow">
            <button
              onClick={() => toggleSection("security")}
              className="w-full flex justify-between items-center px-6 py-4 font-medium"
            >
              Security Setting
              <span>{openSection === "security" ? "▲" : "▼"}</span>
            </button>

            {openSection === "security" && (
              <div className="px-6 pb-6 text-sm text-gray-600">
                Update password and enable security options.
              </div>
            )}
          </div>

          {/* Notification Setting */}
          <div className="bg-white rounded-lg shadow">
            <button
              onClick={() => toggleSection("notification")}
              className="w-full flex justify-between items-center px-6 py-4 font-medium"
            >
              Notification Setting
              <span>{openSection === "notification" ? "▲" : "▼"}</span>
            </button>

            {openSection === "notification" && (
              <div className="px-6 pb-6 text-sm text-gray-600">
                Manage email and app notifications.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
