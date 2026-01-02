import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import HeaderUserCard from "../../components/HeaderUserCard";

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

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulate API call
  useEffect(() => {
    setLoading(true);
    // In a real app, you would fetch team data here
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <HeaderUserCard />

      <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-5.5 rounded-xl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Team Management</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search team..."
                className="pl-10 pr-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <Link
              to="/add-team-member"
              className="bg-yellow-300 hover:bg-yellow-400 text-[#22231F] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={18} />
              Add Member
            </Link>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.role}
                    </p>
                    <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {member.joining}
                    </span>
                  </div>
                </div>
                <div className="dropdown relative">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    <MoreVertical size={20} />
                  </button>
                  <div className="dropdown-menu hidden absolute right-0 mt-2 w-40 bg-white dark:bg-[#333] rounded-md shadow-lg z-10">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(member.id)}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Status</span>
                  <span className="text-green-500 font-medium">Active</span>
                </div>
                <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Last Active</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TeamPage;

// Add this CSS for the dropdown menu
const styles = `
  .dropdown:hover .dropdown-menu {
    display: block;
  }
`;

// Add the styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
