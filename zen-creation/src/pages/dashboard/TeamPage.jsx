import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialTeamMembers = [
  {
    id: 1,
    name: "Priyanka Chopra",
    role: "Admin",
    joining: "2020/09/13",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    role: "Admin",
    joining: "2020/09/13",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Priyanka Chopra",
    role: "Admin",
    joining: "2020/09/13",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    id: 4,
    name: "Priyanka Chopra",
    role: "Admin",
    joining: "2020/09/13",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
  },
];

export default function TeamPage() {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [search, setSearch] = useState("");

  // Remove member
  const handleRemove = (id) => {
    const filtered = teamMembers.filter((member) => member.id !== id);
    setTeamMembers(filtered);
  };

  // Filtered team members by search
  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-200">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-neutral-100 p-6">
        <h1
          className="text-xl font-bold mb-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          ZC
        </h1>

        <nav className="space-y-4 text-sm">
          <p className="font-semibold text-neutral-500">Menu</p>
          <ul className="space-y-2">
            <li
              className="text-neutral-700 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </li>
            <li
              className="text-neutral-700 cursor-pointer"
              onClick={() => navigate("/stocks")}
            >
              Stocks
            </li>
            <li
              className="text-neutral-700 cursor-pointer"
              onClick={() => navigate("/investment")}
            >
              Investment
            </li>
            <li
              className="text-neutral-700 cursor-pointer"
              onClick={() => navigate("/sales")}
            >
              Sales
            </li>
            <li
              className="font-semibold text-black cursor-pointer"
              onClick={() => navigate("/team")}
            >
              Team
            </li>
          </ul>

          <p className="font-semibold text-neutral-500 mt-6">General</p>
          <ul className="space-y-2">
            <li className="cursor-pointer">Setting</li>
            <li className="cursor-pointer">Help</li>
            <li className="cursor-pointer">Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-neutral-100 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">Prason Tuliadhar</p>
              <p className="text-xs text-neutral-500">Admin</p>
            </div>
          </div>

          <span className="mt-2 md:mt-0 bg-red-500 text-white text-xs px-3 py-1 rounded">
            Dark
          </span>
        </div>

        {/* Team Section */}
        <section className="bg-neutral-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="font-semibold text-lg mb-2 md:mb-0">Team</h2>
            <span className="text-sm text-neutral-500 cursor-pointer">
              🔔 Notification
            </span>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search members"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 mb-6 rounded-full border text-sm outline-none"
          />

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.length === 0 ? (
              <p className="text-neutral-500">No team members found.</p>
            ) : (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded object-cover"
                  />

                  <div className="flex-1 text-sm text-center sm:text-left">
                    <p className="font-semibold">Name: {member.name}</p>
                    <p className="text-neutral-500">
                      Designation: {member.role}
                    </p>
                    <p className="text-neutral-500">
                      Joining: {member.joining}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(member.id)}
                    className="mt-2 sm:mt-0 bg-red-500 text-white text-xs px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
