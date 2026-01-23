import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setMessage("");

      setTimeout(() => {
        console.log("Password reset requested for:", email);
        setMessage(
          "If an account exists with this email, you will receive a password reset link.",
        );
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-[#1E1E1E] flex flex-col items-center justify-center px-6 md:px-10 py-10">
        <h1 className="text-white text-3xl font-serif mb-2">Reset Password</h1>
        <div className="w-20 border-b-2 border-yellow-600 mb-6"></div>

        <div className="border border-gray-500 p-6 mb-6 text-center">
          <img src="/logo.png" alt="logo" className="w-24 mx-auto" />
          <p className="text-white mt-2 text-sm">
            Zen Creation <br /> Inventory Management System
          </p>
        </div>

        <div className="space-y-3 text-white text-sm mt-4 text-center md:text-left">
          <p>
            - <b>Secure Access.</b> Your security is our priority.
          </p>
          <p>
            - <b>Quick Recovery.</b> Get back to your account in no time.
          </p>
          <p>
            - <b>24/7 Support.</b> We're here to help you.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-[#F5F3EE] flex flex-col items-center justify-center px-6 md:px-20 py-10">
        <h1 className="text-3xl font-serif mb-8 text-center">
          Reset Your Password
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>

        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-6 w-full max-w-md">
            <p className="text-sm">{message}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm mb-1">Email Address :</label>
            <input
              className={`w-full p-3 border rounded ${
                errors.email ? "border-red-500" : "border-gray-400"
              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 rounded text-white transition-colors ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/login" className="text-blue-600 hover:underline text-sm">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
