import React,{ useState } from "react";
import HeaderUserCard from "../../components/HeaderUserCard";
import Layout from "../../layout/Layout";
import { Bell,FileText, Search } from "lucide-react";
import SeriesAreaChart from "../../components/chart/SeriesAreaChart";
import DonutChart from "../../components/chart/DonutChart";
import "react-day-picker/dist/style.css";
import SalesReportModal from "./SalesReportModel";

export default function Sales() {


  const [openReport, setOpenReport] = useState(false);

  const products = [
    {
      title: "Cap",
      cap: 255,
      cost: 60000,
      sales: 120000,
    },
    {
      title: "Hoodie",
      cap: 100,
      cost: 20000,
      sales: 30000,
    },
    {
      title: "Belt",
      cap: 150,
      cost: 10000,
      sales: 20000,
    },
    {
      title: "Shocks",
      cap: 357,
      cost: 10000,
      sales: 15000,
    },
  ];


  let areaData = [
    { year: "Sun", sales: 700 },
    { year: "Mon", sales: 850 },
    { year: "Tue", sales: 600 },
    { year: "Wed", sales: 820 },
    { year: "Thu", sales: 800 },
    { year: "Fri", sales: 750 },
    { year: "Sat", sales: 900 },
  ];

  let areaColors = {sales: "green",profit: "blue",cost: "red"};
  let areaKeys = ["sales"];

  let pieData = [
    { name: "Caps", value: 40 },
    { name: "Shocks", value: 35 },
    { name: "Belt", value: 12 },
    { name: "Leather Jackets", value: 8 },
    { name: "Other Items", value: 5 },
  ];

  return (
    <Layout>
      {/* Top User Header */}
      <HeaderUserCard />

      <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-5.5 rounded-xl">   
        {/* Header */}
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-2xl font-semibold">Sales</h1>
            </div>
            <Bell className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="flex flex-col mt-4">
          <div className="relative w-72">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Items"
              className="
                w-full
                pl-11 pr-4 py-2.5
                rounded-full
                border border-gray-300
                bg-[#F3F3EE]
                text-gray-700
                placeholder-gray-400
                focus:outline-none
                focus:ring-2 focus:ring-gray-400
                dark:bg-[#32332F]
                dark:border-gray-600
                dark:text-white
                dark:placeholder-gray-400
              "
            />
          </div>
          
        </div>

        {/* Summary Row */}
        <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl flex flex-col sm:flex-row sm:justify-between mt-4 gap-2 text-sm">
          <p>Date:- <strong>01/Oct/2026</strong></p>
          <p>Sales Amount:- <strong className="text-green-600">150,000/-</strong></p>

          {/* Sales Report Button */}
          <button className="flex items-center gap-2 bg-[#E1E1DC] dark:bg-[#32332F] px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition cursor-pointer"
            onClick={() => setOpenReport(true)}>
            <FileText size={18} />
            <span className="font-medium">Sales Report</span>
          </button>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Sales Performance */}
          <div className="lg:col-span-2 bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold mb-4">Overall Sales Performance</h2>
              <h2>01/Oct/2026</h2>
            </div>
            {/* <div className="w-full h-72 bg-gray-100 rounded-lg"></div> */}
            <SeriesAreaChart data = {areaData} xKey="year" areaKeys={areaKeys} colors={areaColors}/>
          </div>

          {/* Top Sales Items */}            
          <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4">Top Sales Items</h2> 
           
            {/* <div className="w-full h-64 bg-gray-100 rounded-lg"></div> */}
            <DonutChart data={pieData} totalValue={84} text={"Top Selling"} />
          </div>
        </div>

        {/* Product Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mt-6 bg-[#FBFBF5] dark:bg-[#22231F] p-5.5 rounded-xl">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                cap={product.cap}
                cost={product.cost}
                sales={product.sales}
              />
            ))}
        </div>
      </div>
      <SalesReportModal
        open={openReport}
        onClose={() => setOpenReport(false)}
      />
    </Layout>

  );
}
const ProductCard = ({ title, cap, cost, sales }) => (
  <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-5 rounded-xl">
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p>Total Cap:- {cap}</p>
    <p>Total Sales Cost:- {cost}/-</p>
    <p>Total Profit:- {sales}/-</p>
  </div>
);



