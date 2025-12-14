import React from "react";
import Layout from "../layout/Layout";
import { User, Bell, Package, DollarSign, ShoppingCart, AlertTriangle, Eye } from "lucide-react";
import HeaderUserCard from "../components/HeaderUserCard";
import SeriesAreaChart from "../components/chart/SeriesAreaChart";
import DonutChart from "../components/chart/DonutChart";

export default function Dashboard() {
  let areaData = [
    { year: "2013", sales: 700, profit: 300 },
    { year: "2014", sales: 850, profit: 350 },
    { year: "2015", sales: 600, profit: 900 },
    { year: "2016", sales: 820, profit: 500 },
    { year: "2017", sales: 800, profit: 600 },
    { year: "2018", sales: 750, profit: 680 },
    { year: "2019", sales: 900, profit: 700 },
  ];

  let areaColors = {sales: "green", profit: "blue"};
  let areaKeys = ["sales", "profit"];
  
  let pieData = [
    { name: "Caps", value: 40 },
    { name: "Shocks", value: 10 },
    { name: "Belt", value: 12 },
    { name: "Leather Jackets", value: 8 },
    { name: "Other Items", value: 14 },
  ];

  const statsData = [
    {
      title: "Total Stock Product",
      value: "4",
      color: "bg-yellow-300",
      icon: <Package />,
    },
    {
      title: "Total Investment",
      value: "Rs. 100,000",
      color: "bg-blue-300",
      icon: <DollarSign />,
    },
    {
      title: "Total Item Sale",
      value: "Rs. 32,000",
      color: "bg-green-300",
      icon: <ShoppingCart />,
    },
    {
      title: "Low Stock Items",
      value: "2",
      color: "bg-red-300",
      icon: <AlertTriangle />,
    },
  ];

  const activities = [
    {
      text: "20 Trucker Cap Added in Stock",
      addedBy: "Rashik Ratan Tuladhar",
      time: "10 mins ago",
    },
    {
      text: "2 Items in Low Stock",
      addedBy: "Priyanka Chopra",
      time: "30 mins ago",
    },
    {
      text: "Rs. 50,000 invested",
      addedBy: "Subin Ratna Tuladhar",
      time: "2 days ago",
    },
    {
      text: "Sales report is ready",
      addedBy: "Prason Tuladhar",
      time: "5 days ago",
    },
  ];

  const teamMembers = [
  {
    name: "Priyanka Chopra",
    role: "Reception",
    years: "2 Years",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Rashik Ratna Tuladhar",
    role: "Customer Handler",
    years: "2 Years",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Subin Ratna Tuladhar",
    role: "Accountant",
    years: "2 Years",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Prason Tuladhar",
    role: "Manager",
    years: "2 Years",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
];


  return (
    <Layout>
        {/* Top Bar */}
        <HeaderUserCard/>

        {/* Main Content */}
        <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-5.5 rounded-xl">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                <h1 className="text-2xl font-semibold">Dashboard</h1>
                </div>
                <Bell className="w-6 h-6 cursor-pointer" />
            </div>
      

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                {statsData.map((stat) => (
                  <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    color={stat.color}
                    icon={stat.icon}
                  />
                ))}
            </div>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mt-6">
                <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
                  <h2 className="font-semibold mb-4">Overall Company Sales Performance</h2>
                  {/* <div className="w-full h-72 bg-gray-100 rounded-lg"></div> */}
                  <SeriesAreaChart data = {areaData} xKey="year" areaKeys={areaKeys} colors={areaColors}/>
                </div>

                <div className="bg-[#FBFBF5] dark:bg-[#62625D] rounded-xl shadow-md">
                  <div className="text-center bg-yellow-300 dark:bg-[#22231F] h-16 py-5 rounded-t-xl">
                    <h2 className="font-semibold text-xl dark:text-[#FBFBF5]">Recent Activity</h2>
                  </div>

                  <ul className="space-y-3 text-sm">
                      {activities.map((activity, index) => (
                        <ActivityItem
                          key={index}
                          text={activity.text}
                          addedBy={activity.addedBy}
                          time={activity.time}
                        />
                      ))}
                  </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-[3fr_2fr] gap-6 mt-6">
                <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-xl">Team</h2>

                    <button className="cursor-pointer flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-black/20 bg-[#E1E1DC] dark:text-[#22231F] hover:bg-black/5 dark:hover:bg-[#bdbdbd] transition">
                      <span>View Request</span>
                      <Eye size={16} />
                    </button>
                  </div>

                  {/* Team List */}
                  <div className="divide-y divide-black/10 dark:divide-white/20">
                    {teamMembers.map((member) => (
                      <TeamItem
                        key={member.name}
                        name={member.name}
                        role={member.role}
                        years={member.years}
                        avatar={member.avatar}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
                    <h2 className="font-semibold mb-4">Top & Least Selling Items</h2>
                    {/* <div className="w-full h-64 bg-gray-100 rounded-lg"></div> */}
                    <DonutChart data={pieData} totalValue={84} text={"Sold"} />
                </div>
            </div>
        </div>
    </Layout>
  );
}

// Small Components ----------------------------------

const StatCard = ({ color, title, value, icon }) => (
  <div className={`${color} p-4 rounded-xl flex items-center gap-4 shadow-sm dark:text-[#22231F]`}>
    <div className="bg-[#FBFBF5] p-3 rounded-lg shadow">{icon}</div>
    <div>
      <p className="text-sm opacity-70">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const ActivityItem = ({ text, addedBy, time }) => (
  <li className="flex justify-between items-center pb-2 pr-4 pl-4 pt-2 border-b dark:bg-[#43433F] dark:border-none m-1">
    <div>
      <p className="font-semibold">{text}</p>
      <p className="text-sm opacity-60">{addedBy}</p>
    </div>
    <span className="opacity-60 text-sm">{time}</span>
  </li>
);

const TeamItem = ({ name, role, years, avatar }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <img
        src={avatar}
        alt={name}
        className="w-9 h-9 rounded-full object-cover"
      />

      {/* Name + Role */}
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm opacity-60">{role}</p>
      </div>
    </div>

    {/* Years */}
    <span className="text-sm opacity-60 whitespace-nowrap">
      {years}
    </span>
  </div>
);
