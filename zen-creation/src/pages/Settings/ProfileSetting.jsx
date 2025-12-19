import { useState } from "react";

export default function ProfileSetting() {
  const [formData, setFormData] = useState({
    name: "",
    oldEmail: "",
    newEmail: "",
    oldPhone: "",
    newPhone: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#3f3f3f] flex items-center justify-center px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-4xl bg-[#efeee9] rounded-lg shadow-lg p-6 md:p-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-serif">Profile Setting</h1>
          <span className="text-xl">⌃</span>
        </div>

        {/* INNER CARD */}
        <div className="bg-[#e1e0db] rounded-lg p-6 md:p-8">
          <h2 className="text-lg mb-4">Change Your Profile Picture</h2>

          {/* PROFILE + FORM */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* IMAGE UPLOAD */}
            <div className="flex flex-col items-center">
              <label className="w-28 h-28 bg-[#f5f4ef] rounded-lg flex flex-col items-center justify-center cursor-pointer border">
                <span className="text-2xl">🖼️</span>
                <span className="text-xs mt-1">Upload Image</span>
                <input
                  type="file"
                  name="image"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>

            {/* FORM FIELDS */}
            <div className="flex-1 space-y-4">
              {/* NAME */}
              <div>
                <label className="text-sm block mb-1">New-Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Prason Ratna Tuladhar"
                  className="w-full p-2 border rounded bg-[#f5f4ef]"
                  onChange={handleChange}
                />
              </div>

              {/* EMAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-1">Old-Email</label>
                  <input
                    type="email"
                    name="oldEmail"
                    placeholder="Prason@gmail.com"
                    className="w-full p-2 border rounded bg-[#f5f4ef]"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm block mb-1">New-Email</label>
                  <input
                    type="email"
                    name="newEmail"
                    placeholder="Prason@gmail.com"
                    className="w-full p-2 border rounded bg-[#f5f4ef]"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* PHONE NUMBERS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm block mb-1">Old-Phone Number</label>
                  <input
                    type="text"
                    name="oldPhone"
                    placeholder="9800000000"
                    className="w-full p-2 border rounded bg-[#f5f4ef]"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm block mb-1">New-Phone Number</label>
                  <input
                    type="text"
                    name="newPhone"
                    placeholder="9800000000"
                    className="w-full p-2 border rounded bg-[#f5f4ef]"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button className="w-full mt-4 bg-[#7a7a75] hover:bg-[#6a6a65] text-white py-3 rounded text-lg">
                Update Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
