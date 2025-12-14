import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    navigate("/NextSignup");
  };

  return (
    // 🔹 flex-col on mobile, flex-row on large screens
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SIDE */}
      {/* 🔹 Full width on mobile, half on large screens */}
      <div className="w-full lg:w-1/2 bg-[#1f1f1f] px-6 sm:px-10 lg:px-16 py-10 lg:py-14">
        {/* Heading */}
        <h2 className="text-center text-3xl sm:text-4xl font-semibold text-white mb-10 border-b pb-3 border-yellow-700 tracking-wide">
          Let’s get Started
        </h2>

        {/* Form */}
        <form className="space-y-8">
          {/* Full Name */}
          <div>
            <label className="text-white block mb-2">Full Name :</label>
            <input
              className="w-full p-3 border bg-black border-gray-600 text-white rounded"
              name="name"
              placeholder="Prason Ratna Tuladhar"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Section */}
          {/* 🔹 Stack vertically on mobile, row on desktop */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full">
              <label className="text-white block mb-2">Password :</label>
              <input
                className="w-full p-3 border bg-black border-gray-600 text-white rounded"
                name="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full">
              <label className="text-white block mb-2">
                Confirm Password :
              </label>
              <input
                className="w-full p-3 border bg-black border-gray-600 text-white rounded"
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-white block mb-2">Email Address :</label>
            <input
              className="w-full p-3 border bg-black border-gray-600 text-white rounded"
              name="email"
              type="email"
              placeholder="prason@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-white block mb-2">Contact Number :</label>
            <input
              className="w-full p-3 border bg-black border-gray-600 text-white rounded"
              name="contactNumber"
              type="tel"
              placeholder="9808975989"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded text-lg font-medium mt-6"
          >
            Next →
          </button>
        </form>

        {/* Login */}
        <p className="text-center mt-4 text-sm text-gray-400">
          Already Have an Account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-500"
          >
            Login
          </button>
        </p>
      </div>

      {/* RIGHT SIDE  */}
      {/*  Hidden on mobile, shown on large screens */}
      <div className="hidden lg:flex w-1/2 bg-[#f7f5ef] flex-col items-center py-16">
        <h1 className="text-4xl font-serif mb-2">Sign Up</h1>
        <h2 className="text-lg text-gray-700 mb-6">Step - 1</h2>

        {/* Logo */}
        <div className="border p-6 mt-4 w-52 h-52 flex flex-col items-center justify-center">
          <img src="/logo.png" alt="Zen Creation" className="w-24 mb-3" />
          <p className="text-center text-sm mt-2">
            Zen Creation <br />
            Inventory Management <br />
            System
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-10 space-y-6 w-4/5">
          <div>
            <h3 className="font-semibold">➜ Get Started</h3>
            <p className="text-sm text-gray-600">
              Take control of your inventory today
            </p>
          </div>

          <div>
            <h3 className="font-semibold">⦿ Track Everything Effortlessly.</h3>
            <p className="text-sm text-gray-600">
              Instant stats, reports and insights.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">📈 Grow Confidently.</h3>
            <p className="text-sm text-gray-600">
              Manage, analyze and optimize with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
