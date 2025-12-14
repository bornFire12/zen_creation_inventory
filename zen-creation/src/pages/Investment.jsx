import React,{ useEffect, useState } from "react";
import HeaderUserCard from "../components/HeaderUserCard";
import Layout from "../layout/Layout";
import { Bell,Pencil, X, Search } from "lucide-react";
import SeriesAreaChart from "../components/chart/SeriesAreaChart";
import DonutChart from "../components/chart/DonutChart";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function Investment() {

  const [open, setOpen] = useState(false);

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
    { year: "2013", sales: 700, profit: 300, cost: 400 },
    { year: "2014", sales: 850, profit: 350, cost: 250 },
    { year: "2015", sales: 600, profit: 900, cost: 300 },
    { year: "2016", sales: 820, profit: 500, cost: 400 },
    { year: "2017", sales: 800, profit: 400, cost: 350 },
    { year: "2018", sales: 750, profit: 680, cost: 380 },
    { year: "2019", sales: 900, profit: 800, cost: 400 },
  ];

  let areaColors = {sales: "green",profit: "blue",cost: "red"};
  let areaKeys = ["sales", "profit", "cost"];

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
            <h1 className="text-2xl font-semibold">Investment</h1>
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
          {/* Edit Amount Button */}
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow mt-4 w-fit cursor-pointer flex items-center justify-center" onClick={() => setOpen(true)}>
              <Pencil size={16} className="inline-block mr-2" />
             <span>Edit Invest Amount</span>
          </button>
          {open && <EditInvestModal onClose={() => setOpen(false)} />}
        </div>

        {/* Summary Row */}
        <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl flex flex-col sm:flex-row sm:justify-between mt-4 gap-2 text-sm">
            <p>Date:- <strong>01/Oct/2026</strong></p>
            <p>Invested Amount:- <strong>100,000/-</strong></p>
            <p>No. of Product:- <strong>4</strong></p>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Investment Performance */}
          <div className="lg:col-span-2 bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4">Overall Company Sales Performance</h2>
            {/* <div className="w-full h-72 bg-gray-100 rounded-lg"></div> */}
            <SeriesAreaChart data = {areaData} xKey="year" areaKeys={areaKeys} colors={areaColors}/>
          </div>

          {/* Top Invested Items */}            
          <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4">Top Invested Items</h2>
            {/* <div className="w-full h-64 bg-gray-100 rounded-lg"></div> */}
            <DonutChart data={pieData} totalValue={84} text={"Invested"} />
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

    </Layout>

  );
}
const ProductCard = ({ title, cap, cost, sales }) => (
  <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-5 rounded-xl">
    <h3 className="font-semibold text-xl mb-2">{title}</h3>
    <p>Total Cap:- {cap}</p>
    <p>Total Inventory Cost:- {cost}/-</p>
    <p>Total Sales Value:- {sales}/-</p>
  </div>
);

const EditInvestModal = ({ onClose }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("300,000");

  useEffect(() => {
    if (onClose) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    // ✅ Cleanup (important)
    return () => {
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Wrapper to control calendar positioning */}
      <div className="relative z-10">

        {/* Modal */}
        <div className="relative bg-[#E1E1DC] dark:bg-[#22231F] rounded-xl shadow-xl w-[360px] p-4">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 opacity-60 hover:opacity-100 cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Fields */}
          <div className="space-y-3 text-sm mt-6">
            {/* Date */}
            <div className="flex items-center gap-2 bg-gray-300 dark:bg-[#43433F] rounded p-2">
              <span className="text-xs">Date:-</span>
              <input
                readOnly
                value={date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
                onClick={() => setShowCalendar(!showCalendar)}
                className="bg-white dark:bg-[#767671] px-2 py-1 rounded text-sm cursor-pointer"
              />
            </div>

            {/* Amount */}
            <div className="flex items-center gap-2 bg-gray-300 dark:bg-[#43433F] rounded p-2">
              <span className="text-xs">Invested Amount:-</span>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-white dark:bg-[#767671] px-2 py-1 rounded text-sm w-full"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-[#767671] text-white font-semibold px-4 py-1.5 rounded-lg cursor-pointer"
              onClick={onClose}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Calendar (outside modal, below it) */}
        {showCalendar && (
          <div className="absolute left-0 mt-3 bg-[#E1E1DC] dark:bg-[#2A2A2A] rounded-xl shadow-xl p-3">
           <DayPicker
              mode="single"
              selected={date}
              onSelect={(selected) => {
                if (selected) {
                  setDate(selected);
                }
              }}
              modifiersClassNames={{
                selected: "rdp-custom-selected",
                today: "rdp-custom-today",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

