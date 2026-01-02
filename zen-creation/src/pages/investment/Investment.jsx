import React, { useEffect, useState } from "react";
import HeaderUserCard from "../../components/HeaderUserCard";
import Layout from "../../components/layout/Layout";
import { Bell, Pencil, X, Search } from "lucide-react";
import SeriesAreaChart from "../../components/chart/SeriesAreaChart";
import DonutChart from "../../components/chart/DonutChart";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

/**
 * @typedef {Object} Product
 * @property {string} title - Product name
 * @property {number} cap - Capacity or quantity
 * @property {number} cost - Cost of the product
 * @property {number} sales - Sales amount
 */

/**
 * @typedef {Object} AreaDataPoint
 * @property {string} year - Year of the data point
 * @property {number} sales - Sales amount
 * @property {number} profit - Profit amount
 * @property {number} cost - Cost amount
 */

/**
 * @typedef {Object} PieDataPoint
 * @property {string} name - Category name
 * @property {number} value - Percentage value
 */

export default function Investment() {
  // UI State
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data State
  const [products, setProducts] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [areaColors] = useState({
    sales: "green",
    profit: "blue",
    cost: "red",
  });
  const [areaKeys] = useState(["sales", "profit", "cost"]);
  const [pieData, setPieData] = useState([]);

  // Static investment data
  useEffect(() => {
    const fetchInvestmentData = async () => {
      setIsLoading(true);
      try {
        // Sample products data
        const mockProducts = [
          { title: "Tech Stocks", cap: 15000, cost: 12000, sales: 18000 },
          { title: "Real Estate", cap: 250000, cost: 200000, sales: 280000 },
          { title: "Crypto", cap: 5000, cost: 3000, sales: 7500 },
          { title: "Bonds", cap: 50000, cost: 50000, sales: 55000 },
          { title: "Mutual Funds", cap: 75000, cost: 70000, sales: 82000 },
        ];

        // Sample area chart data
        const mockAreaData = [
          { year: "Jan", sales: 4000, profit: 2400, cost: 1600 },
          { year: "Feb", sales: 3000, profit: 1398, cost: 1602 },
          { year: "Mar", sales: 2000, profit: 9800, cost: 10200 },
          { year: "Apr", sales: 2780, profit: 3908, cost: 1128 },
          { year: "May", sales: 1890, profit: 4800, cost: 2910 },
          { year: "Jun", sales: 2390, profit: 3800, cost: 1410 },
        ];

        // Sample pie chart data
        const mockPieData = [
          { name: "Stocks", value: 35 },
          { name: "Real Estate", value: 40 },
          { name: "Bonds", value: 15 },
          { name: "Crypto", value: 10 },
        ];

        setProducts(mockProducts);
        setAreaData(mockAreaData);
        setPieData(mockPieData);
      } catch (err) {
        console.error("Error fetching investment data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestmentData();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <HeaderUserCard />
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <HeaderUserCard />
        <div className="p-6">
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

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
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow mt-4 w-fit cursor-pointer flex items-center justify-center"
            onClick={() => setOpen(true)}
          >
            <Pencil size={16} className="inline-block mr-2" />
            <span>Edit Invest Amount</span>
          </button>
          {open && <EditInvestModal onClose={() => setOpen(false)} />}
        </div>

        {/* Summary Row */}
        <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl flex flex-col sm:flex-row sm:justify-between mt-4 gap-2 text-sm">
          <p>
            Date:- <strong>01/Oct/2026</strong>
          </p>
          <p>
            Invested Amount:- <strong>100,000/-</strong>
          </p>
          <p>
            No. of Product:- <strong>4</strong>
          </p>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Investment Performance */}
          <div className="lg:col-span-2 bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4">
              Overall Company Sales Performance
            </h2>
            <div className="h-80 w-full">
              <SeriesAreaChart
                data={areaData}
                xKey="year"
                areaKeys={areaKeys}
                colors={areaColors}
              />
            </div>
          </div>

          {/* Top Invested Items */}
          <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4">Top Invested Items</h2>
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
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

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
