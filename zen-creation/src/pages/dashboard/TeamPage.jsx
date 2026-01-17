import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { Plus, Search, MoreVertical, Edit, Trash2 } from "lucide-react";
import HeaderUserCard from "../../components/HeaderUserCard";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTeamMembers = () => {
      try {
        const savedMembers = localStorage.getItem("teamMembers");
        if (savedMembers) {
          setTeamMembers(JSON.parse(savedMembers));
        }
      } catch (error) {
        console.error("Error loading team members:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTeamMembers();

    const handleStorageChange = () => {
      loadTeamMembers();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      const updatedMembers = teamMembers.filter((member) => member.id !== id);
      setTeamMembers(updatedMembers);
      localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
    }
  };
  const filteredMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }
  const [openMenuId, setOpenMenuId] = useState(null);
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const closeMenu = () => {
    setOpenMenuId(null);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      const updatedMembers = teamMembers.filter((member) => member.id !== id);
      setTeamMembers(updatedMembers);
      localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
      setOpenMenuId(null);
      alert("Team member deleted successfully!");
    }
  };

  return (
    <Layout>
      <HeaderUserCard />

      <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-5.5 rounded-xl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Team Management</h1>
          <div className="flex items-center space-x-4">
            <Link
              to="/AddTeam"
              className="bg-[#b3b3b3] hover:bg-[#797979] text-[#22231F] px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
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
                  {member.profilePicture ? (
                    <img
                      src={member.profilePicture}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white shadow">
                      <span className="text-gray-500 text-2xl font-medium">
                        {member.name
                          ? member.name.charAt(0).toUpperCase()
                          : "?"}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.role}
                    </p>
                    <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-3 py-0.5 rounded-full">
                      <p className="text-black font-bold padding-bottom: 2px;">
                        Joining
                      </p>
                      {member.joining}
                    </span>
                  </div>
                </div>
                <div className=" relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(member.id);
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <MoreVertical size={20} />
                  </button>
                  {openMenuId === member.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#333] rounded-md shadow-lg z-50">
                      <button
                        onClick={() => {
                          // Add your edit functionality here
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(member.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
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
