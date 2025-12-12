import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupStep2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profilePicture: null,
    year: "",
    month: "",
    day: "",
    citizenshipNumber: "",
    citizenshipImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Step 2:", formData);
    navigate("/signup/success");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-[#1A1A1A] px-20 py-10 text-white">
        {/* PAGE TITLE */}
        <h1 className="text-4xl font-serif">Let’s get Started</h1>
        <div className="w-60 h-[2px] bg-yellow-600 mt-2 mb-6"></div>

        {/* PROFILE UPLOAD */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-gray-700 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xl">👤</span>
          </div>

          <h2 className="mt-3 text-lg font-medium">Upload your</h2>
          <h3 className="text-sm text-gray-300">Profile Picture</h3>

          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="mt-3 text-sm"
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* DATE OF BIRTH */}
          <div>
            <label className="text-sm">Date of Birth :</label>
            <div className="flex gap-4 mt-2">
              <select
                name="year"
                className="border bg-black border-gray-600 px-4 py-2 rounded w-1/3"
                onChange={handleChange}
              >
                <option>Year</option>
                {Array.from({ length: 60 }, (_, i) => (
                  <option key={i}>{1980 + i}</option>
                ))}
              </select>

              <select
                name="month"
                className="border bg-black border-gray-600 px-4 py-2 rounded w-1/3"
                onChange={handleChange}
              >
                <option>Month</option>
                {[
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              <select
                name="day"
                className="border bg-black border-gray-600 px-4 py-2 rounded w-1/3"
                onChange={handleChange}
              >
                <option>Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
          </div>

          {/* CITIZENSHIP NUMBER */}
          <div>
            <label className="text-sm">Citizenship Number :</label>
            <input
              type="text"
              name="citizenshipNumber"
              placeholder="Enter Citizenship Number"
              className="w-full mt-2 p-3 bg-black border border-gray-600 rounded"
              onChange={handleChange}
            />
          </div>

          {/* CITIZENSHIP IMAGE UPLOAD */}
          <div>
            <label className="text-sm">Upload Citizenship Image :</label>
            <div className="w-full mt-3 h-36 bg-gray-800 border border-gray-600 rounded flex items-center justify-center text-gray-400">
              <input
                type="file"
                name="citizenshipImage"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full mt-4 py-3 bg-gray-500 rounded text-white text-lg"
          >
            Submit
          </button>
        </form>

        <div className="mt-4 text-center text-gray-400 text-sm">
          <a href="/login" className="underline">
            Already Have an Account ?
          </a>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 bg-[#F5F3EE] flex flex-col items-center py-20">
        <h1 className="text-4xl font-serif">Sign Up</h1>
        <h2 className="text-lg mt-1">Step - 2</h2>

        {/* LOGO BOX */}
        <div className="mt-6 border p-6">
          <img src="/logo.png" alt="Zen Creation" className="w-28" />
          <p className="text-center text-sm mt-2">
            Zen Creation
            <br />
            Inventory Management
            <br />
            System
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-10 space-y-6">
          <p>
            ➤ <b>Get Started</b>
            <br />
            <span className="text-sm">
              Take Control of Your Inventory Today
            </span>
          </p>
          <p>
            ◆ <b>Track Everything Effortlessly</b>
            <br />
            <span className="text-sm">Instant Stats, Reports and Insights</span>
          </p>
          <p>
            ▲ <b>Grow Confidently</b>
            <br />
            <span className="text-sm">
              Manage, Analyze and Optimize with Ease
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
