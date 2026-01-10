import { useState } from "react";
import { Plus } from "lucide-react";

export default function AddTeam() {
  const [formData, setFormData] = useState({
    name: "",
    joiningDate: "",
    role: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});
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
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="max-w-md mx-auto p-10 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-20  relative overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Team Member</h2>
      <form className="space-y-4 ">
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
          className="w-full bg-[#b3b3b3] hover:bg-[#797979] text-[#22231F] font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Add Team Member
        </button>
      </form>
    </div>
  );
}
