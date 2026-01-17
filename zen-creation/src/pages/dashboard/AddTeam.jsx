import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { ArrowLeft } from "lucide-react";
export default function AddTeam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    joiningDate: "",
    role: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [teamMembers, setTeamMembers] = useState(() => {
    const saved = localStorage.getItem("teamMembers");
    return saved ? JSON.parse(saved) : [];
  });
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }
    if (!formData.role) {
      newErrors.role = "Please select a role";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Create a new team member object
    const newMember = {
      id: Date.now(), // Generate a unique ID
      name: formData.name,
      joiningDate: formData.joiningDate,
      role: formData.role,
      // For the profile picture, you might want to handle file upload here
      // For now, we'll just store the file name
      profilePicture: formData.profilePicture,

      status: "active", // Default status
    };
    // Update the team members list
    const updatedTeam = [...teamMembers, newMember];

    // Save to localStorage
    localStorage.setItem("teamMembers", JSON.stringify(updatedTeam));

    // Update state
    setTeamMembers(updatedTeam);

    // Show success message
    setSuccessMessage("Team member added successfully!");

    // Reset form
    setFormData({
      name: "",
      joiningDate: "",
      role: "",
      profilePicture: null,
    });

    setIsSubmitting(false);
    // Optional: Redirect after a delay
    setTimeout(() => {
      setSuccessMessage("");
      // If you want to redirect to team list after adding
      // navigate('/team'); // Uncomment if you have react-router-dom's useNavigate
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-20  relative overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Add Team Member</h2>
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Joining Date
            </label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleInputChange}
              className={`w-full p-2 border ${
                errors.joiningDate
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-md dark:bg-gray-700 dark:text-white`}
            />
            {errors.joiningDate && (
              <p className="mt-1 text-sm text-red-600">{errors.joiningDate}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`w-full p-2 border ${
                errors.role
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              } rounded-md dark:bg-gray-700 dark:text-white`}
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="manager">Stock Manager</option>
              <option value="member">Employee</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-[#b3b3b3] hover:bg-[#797979] text-[#22231F] font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Team Member"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
