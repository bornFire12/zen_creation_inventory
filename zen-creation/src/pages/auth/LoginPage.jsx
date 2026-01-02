import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.name !== "admin" && formData.password.length < 6) {
      // Only enforce 6-character minimum for non-admin users
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Check if both username and password are 'admin'
        if (formData.name === "admin" && formData.password === "admin") {
          console.log("Admin login successful");
          // Simulate API call delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          login({ name: formData.name });
          // Navigation is now handled by the useEffect that watches the user state
        } else {
          // If credentials don't match, show error
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors((prev) => ({
          ...prev,
          form: "Invalid username or password. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 bg-[#1E1E1E] flex flex-col items-center justify-center px-6 md:px-10 py-10">
        <h1 className="text-white text-3xl font-serif mb-2">Login</h1>
        <div className="w-20 border-b-2 border-yellow-600 mb-6"></div>

        {/* LOGO BOX */}
        <div className="border border-gray-500 p-6 mb-6 text-center">
          <img src="/logo.png" alt="logo" className="w-24 mx-auto" />
          <p className="text-white mt-2 text-sm">
            Zen Creation <br /> Inventory Management System
          </p>
        </div>

        {/* TEXT LIST */}
        <div className="space-y-3 text-white text-sm mt-4 text-center md:text-left">
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
      <div className="w-full md:w-1/2 bg-[#F5F3EE] flex flex-col items-center justify-center px-6 md:px-20 py-10">
        <h1 className="text-3xl font-serif mb-8 text-center">Welcome Back!</h1>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm mb-1">Name :</label>
            <input
              className={`w-full p-3 border rounded ${
                errors.name ? "border-red-500" : "border-gray-400"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              type="text"
              name="name"
              value={formData.name}
              placeholder="Prason Ratna Tuladhar"
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1">Password :</label>
            <input
              className={`w-full p-3 border rounded ${
                errors.password ? "border-red-500" : "border-gray-400"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-xs">Keep me logged in?</span>
          </div>
          {errors.form && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">
              <p>{errors.form}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 rounded text-white transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer links */}
        <div className="flex w-full max-w-md justify-between text-xs mt-4">
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
};

export default LoginPage;
