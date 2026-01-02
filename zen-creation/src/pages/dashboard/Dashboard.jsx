import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  User,
  Bell,
  Package,
  DollarSign,
  ShoppingCart,
  AlertTriangle,
  Eye,
  LogOut,
} from "lucide-react";
import HeaderUserCard from "../../components/HeaderUserCard";
import SeriesAreaChart from "../../components/chart/SeriesAreaChart";
import DonutChart from "../../components/chart/DonutChart";
import { useAuth } from "../../context/AuthContext";

/* =========================
   STATIC DATA (API READY)
========================= */

// Analytics
const analyticsData = {
  areaData: [
    { year: "2013", sales: 700, profit: 300 },
    { year: "2014", sales: 850, profit: 350 },
    { year: "2015", sales: 600, profit: 900 },
    { year: "2016", sales: 820, profit: 500 },
    { year: "2017", sales: 800, profit: 600 },
    { year: "2018", sales: 750, profit: 680 },
    { year: "2019", sales: 900, profit: 700 },
  ],
  areaKeys: ["sales", "profit"],
  areaColors: { sales: "green", profit: "blue" },
  pieData: [
    { name: "Caps", value: 40 },
    { name: "Shocks", value: 10 },
    { name: "Belt", value: 12 },
    { name: "Leather Jackets", value: 8 },
    { name: "Other Items", value: 14 },
  ],
};

// Stats
const statsArray = [
  {
    title: "Total Stock Product",
    value: "4",
    color: "bg-yellow-300",
    icon: "package",
  },
  {
    title: "Total Investment",
    value: "Rs. 100,000",
    color: "bg-blue-300",
    icon: "dollar-sign",
  },
  {
    title: "Total Item Sale",
    value: "Rs. 32,000",
    color: "bg-green-300",
    icon: "shopping-cart",
  },
  {
    title: "Low Stock Items",
    value: "2",
    color: "bg-red-300",
    icon: "alert-triangle",
  },
];

// Activities
const activitiesArray = [
  {
    id: 1,
    text: "20 Trucker Cap Added in Stock",
    addedBy: "Rashik Ratan Tuladhar",
    time: "10 mins ago",
  },
  {
    id: 2,
    text: "2 Items in Low Stock",
    addedBy: "Priyanka Chopra",
    time: "30 mins ago",
  },
  {
    id: 3,
    text: "Rs. 50,000 invested",
    addedBy: "Subin Ratna Tuladhar",
    time: "2 days ago",
  },
  {
    id: 4,
    text: "Sales report is ready",
    addedBy: "Prason Tuladhar",
    time: "5 days ago",
  },
];

// Team
const teamArray = [
  {
    id: 1,
    name: "Priyanka Chopra",
    role: "Reception",
    years: "2 Years",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "Rashik Ratna Tuladhar",
    role: "Customer Handler",
    years: "2 Years",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
];

export default function Dashboard() {
  /* =========================
     STATE
  ========================= */
  const [analytics, setAnalytics] = useState(analyticsData);
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* =========================
     ICON MAP
  ========================= */
  const iconComponents = {
    user: <User />,
    bell: <Bell />,
    package: <Package />,
    "dollar-sign": <DollarSign />,
    "shopping-cart": <ShoppingCart />,
    "alert-triangle": <AlertTriangle />,
    eye: <Eye />,
  };

  /* =========================
     FETCH (API READY)
  ========================= */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // 🔗 Replace later with real API calls
        setStats(statsArray);
        setActivities(activitiesArray);
        setTeamMembers(teamArray);

        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = stats.map((stat) => ({
    ...stat,
    icon: iconComponents[stat.icon],
  }));

  const { areaData, areaKeys, areaColors, pieData } = analytics;

  return (
    <Layout>
      <HeaderUserCard />

      <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-5.5 rounded-xl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 cursor-pointer" />
            <LogOut
              className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-900"
              onClick={() => {
                const { logout } = useAuth();
                logout();
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {statsData.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mt-6">
          <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl">
            <h2 className="font-semibold mb-4">
              Overall Company Sales Performance
            </h2>
            <SeriesAreaChart
              data={areaData}
              xKey="year"
              areaKeys={areaKeys}
              colors={areaColors}
            />
          </div>

          <div className="bg-[#FBFBF5] dark:bg-[#62625D] rounded-xl">
            <div className="text-center bg-yellow-300 dark:bg-[#22231F] h-16 py-5 rounded-t-xl">
              <h2 className="font-semibold text-xl">Recent Activity</h2>
            </div>

            <ul className="space-y-3 text-sm">
              {activities.map((a) => (
                <ActivityItem key={a.id} {...a} />
              ))}
            </ul>
          </div>
        </div>

        {/* Team + Donut */}
        <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6 mt-6">
          <Link
            to="/team"
            className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl hover:shadow-md transition-shadow cursor-pointer block"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-xl">Team</h2>
              <span className="text-sm text-blue-500">View All</span>
            </div>
            {teamMembers.map((m) => (
              <TeamItem key={m.id} {...m} />
            ))}
          </Link>

          <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl">
            <h2 className="font-semibold mb-4">Top & Least Selling Items</h2>
            <DonutChart data={pieData} totalValue={84} text="Sold" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

const StatCard = ({ color, title, value, icon }) => (
  <div className={`${color} p-4 rounded-xl flex items-center gap-4`}>
    <div className="bg-white p-3 rounded-lg">{icon}</div>
    <div>
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const ActivityItem = ({ text, addedBy, time }) => (
  <li className="flex justify-between p-3 border-b">
    <div>
      <p className="font-semibold">{text}</p>
      <p className="text-sm opacity-60">{addedBy}</p>
    </div>
    <span className="opacity-60 text-sm">{time}</span>
  </li>
);

const TeamItem = ({ name, role, years, avatar }) => (
  <div className="flex justify-between items-center py-3">
    <div className="flex items-center gap-3">
      <img src={avatar} className="w-9 h-9 rounded-full" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm opacity-60">{role}</p>
      </div>
    </div>
    <span className="text-sm opacity-60">{years}</span>
  </div>
);
