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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signup/success");
  };
  const onclick = (e) => {
    navigate("/NextSignup");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-[#1f1f1f] px-16 py-14">
        {/* Heading */}
        <h2 className="text-center text-4xl font-semibold text-white mb-10 border-b pb-3 border-yellow-700 tracking-wide">
          Let’s get Started
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
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

          {/* Password + Confirm Password */}
          <div className="flex gap-6">
            <div className="w-1/2">
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

            <div className="w-1/2">
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

          {/* Email Address */}
          <div>
            <label className="text-white block mb-2">Email Address :</label>
            <input
              className="w-full p-3 border bg-black border-gray-600 text-white rounded"
              name="email"
              type="email"
              placeholder="Prason@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Number */}
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
            type="submit"
            onClick={onclick}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded text-lg font-medium mt-6"
          >
            Next →
          </button>
        </form>

        {/* Already Have Account */}
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

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-[#f7f5ef] flex flex-col items-center py-16">
        <h1 className="text-4xl font-serif mb-2">Sign Up</h1>
        <h2 className="text-lg text-gray-700 mb-6">Step - 1</h2>

        {/* Logo Section Box */}
        <div className="border p-6 mt-4 w-52 h-52 flex flex-col items-center justify-center">
          <img src="/logo.png" alt="Zen Creation" className="w-24 mb-3" />
          <p className="text-center text-sm mt-2">
            Zen Creation <br /> Inventory Management <br /> System
          </p>
        </div>

        {/* Benefits List */}
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
