import { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function SecuritySettings() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Password Update:", formData);
  };
  const SecuritySettings = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogoutAll = () => {
      if (window.confirm("Are you sure you want to logout from all devices?")) {
        // Add any additional logout logic here
        logout();
        navigate("/login"); // or your login route
      }
    };

    return (
      <Layout>
        <div className="relative min-h-screen bg-[#3f3f3f] flex items-center justify-center px-4">
          {/* MAIN CARD */}
          <div className="w-full max-w-5xl bg-[#f6f5f0] rounded-xl p-8">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-6 top-8 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 "
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            {/* HEADER */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold flex text-black items-center justify-center gap-2">
                Security Setting
                <span className="text-xl">⌃</span>
              </h1>
            </div>

            {/* FORM */}
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* PASSWORD FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Old Password */}
                <div>
                  <label className="block text-black text-sm mb-2">
                    Old-Password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="w-full p-3 border text-black border-gray-400 rounded-md bg-transparent"
                    placeholder="************"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm text-black mb-2">
                    New-Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full p-3 border text-black border-gray-400 rounded-md bg-transparent"
                    placeholder="************"
                  />
                </div>
              </div>

              {/* LOGOUT SECTION */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-sm text-black">
                  Want to Logout from all devices ?
                </p>

                <button
                  type="button"
                  onClick={handleLogoutAll}
                  className="flex items-center gap-2 bg-[#4a4a4a] text-white px-4 py-2 rounded-md w-fit"
                >
                  ⎋ Logout all sessions
                </button>
              </div>

              {/* UPDATE BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#7a7a74] text-white py-4 rounded-md text-lg font-medium"
              >
                Update Changes
              </button>
            </form>
          </div>
        </div>
      </Layout>
    );
  };
}
