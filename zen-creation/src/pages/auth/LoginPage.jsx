import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-row">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-[#1E1E1E] flex flex-col items-center justify-center px-10">
        <h1 className="text-white text-3xl font-serif mb-2">Login</h1>
        <div className="w-20 border-b-2 border-yellow-600 mb-6"></div>

        {/* LOGO BOX */}
        <div className="border border-gray-500 p-6 mb-6">
          <img src="/logo.png" alt="logo" className="w-28" />
          <p className="text-white text-center mt-2 text-sm">
            Zen Creation <br /> Inventory Management System
          </p>
        </div>

        {/* LEFT SIDE TEXT LIST */}
        <div className="space-y-4 text-white text-sm mt-4">
          <p>
            • <b>Stay Organized.</b> Keep everything under control.
          </p>
          <p>
            • <b>Get All Your Stats.</b> Instant reports in one click.
          </p>
          <p>
            • <b>Everything Secured.</b> Safety and privacy first.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-[#F5F3EE] flex flex-col items-center justify-center px-20">
        <h1 className="text-3xl font-serif mb-8">Welcome Back!</h1>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Name :</label>
            <input
              className="w-full p-3 border border-gray-400 rounded"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Prason Ratna Tuladhar"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password :</label>
            <input
              className="w-full p-3 border border-gray-400 rounded"
              type="password"
              name="password"
              value={formData.password}
              placeholder="********"
              onChange={handleChange}
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-xs">Keep me logged in?</span>
          </div>

          {/* Submit button */}
          <button className="w-full bg-gray-500 text-white py-3 rounded">
            Submit
          </button>
        </form>

        {/* Footer links */}
        <div className="flex w-full justify-between text-xs mt-4">
          <button
            onClick={() => navigate("/signup")}
            className="text-gray-700 hover:underline"
          >
            Create an Account ?
          </button>

          <button className="text-gray-700 hover:underline">
            Forgot Password ?
          </button>
        </div>
      </div>
    </div>
  );
}
