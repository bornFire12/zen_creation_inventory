import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import HeaderUserCard from "../../components/HeaderUserCard";
import { Bell, Search, Plus, Eye, Trash2, X } from "lucide-react";
import { toast } from "react-hot-toast";
import SeriesAreaChart from "../../components/chart/SeriesAreaChart";

import InventoryModal from "./InventoryModel";

// Define types for better code completion
/**
 * @typedef {Object} StockItem
 * @property {string} id - Unique identifier for the stock item
 * @property {string} name - Name of the product
 * @property {number} variety - Number of variants
 * @property {Array} items - Array of items in stock
 */

export default function Stocks() {
  // Navigation
  const navigate = useNavigate();
  const { id } = useParams();

  // UI State
  const [open, setOpen] = useState(false);

  const [openAddInventory, setOpenAddInventory] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stockItem, setStockItem] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  // Data State
  const [stockTable, setStockTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chart Data
  const areaData = [
    { year: "2021", shoes: 800, cap: 400, belt: 300, jackets: 500 },
    { year: "2022", shoes: 900, cap: 450, belt: 350, jackets: 600 },
    { year: "2023", shoes: 600, cap: 700, belt: 500, jackets: 800 },
    { year: "2024", shoes: 850, cap: 500, belt: 400, jackets: 650 },
  ];

  const areaKeys = ["shoes", "cap", "belt", "jackets"];
  const areaColors = {
    shoes: "#2563eb",
    cap: "#dc2626",
    belt: "#f97316",
    jackets: "#16a34a",
  };

  const activities = [
    {
      text: "350 Red Caps Added in Stock",
      addedBy: "Nabin Joshi",
      time: "10 Mins Ago",
    },
    {
      text: "121 Shoes Added in Stock",
      addedBy: "Nabin Joshi",
      time: "20 Mins Ago",
    },
    {
      text: "50 Red Belts Added in Stock",
      addedBy: "Nabin Joshi",
      time: "30 Mins Ago",
    },
    {
      text: "21 Red Jackets Added in Stock",
      addedBy: "Nabin Joshi",
      time: "40 Mins Ago",
    },
    {
      text: "15 Belt Added in Stock",
      addedBy: "Subin Ratna Tuladhar",
      time: "50 Mins Ago",
    },
  ];

  // Fetch stock data from API
  useEffect(() => {
    const fetchStockItem = () => {
      try {
        setIsLoading(true); // Changed from setLoading to setIsLoading
        const savedData = JSON.parse(localStorage.getItem("stockData")) || [];
        const item = savedData.find((item) => item.id === id);
        if (item) {
          setStockItem(item);
          setInventoryItems(item.items || []);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false); // Changed from setLoading to setIsLoading
      }
    };
    fetchStockItem();
  }, [id]);
  useEffect(() => {
    const loadStockData = () => {
      try {
        setIsLoading(true);
        const savedData = JSON.parse(localStorage.getItem("stockData"));

        if (savedData && savedData.length > 0) {
          setStockTable(savedData);
        } else {
          // Initialize with default data if no saved data exists
          const defaultData = [
            { id: "001", name: "Cap", variety: 2, items: [] },
            { id: "002", name: "Shoes", variety: 1, items: [] },
          ];
          setStockTable(defaultData);
          localStorage.setItem("stockData", JSON.stringify(defaultData));
        }
      } catch (err) {
        console.error("Error loading stock data:", err);
        setError("Failed to load stock data");
      } finally {
        setIsLoading(false);
      }
    };
    // Only load data if we're not in a specific product view (when id is not present)
    if (!id) {
      loadStockData();
    }
  }, [id]);
  // In Stocks.jsx
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("stockData"));
    if (savedData) {
      setStockTable(savedData);
    } else {
      // Initialize with default data if no saved data exists
      setStockTable(initialStockData);
      localStorage.setItem("stockData", JSON.stringify(initialStockData));
    }
  }, []);
  const handleAddInventoryItem = (productId, newItem) => {
    setStockTable((prev) => {
      const updated = prev.map((product) => {
        if (product.id === productId) {
          const updatedItems = [...(product.items || []), newItem];
          return {
            ...product,
            items: updatedItems,
            variety: updatedItems.length,
            // Update the main product details with the latest item's data
            ...(newItem.size && { size: newItem.size }),
            ...(newItem.color && { color: newItem.color }),
            ...(newItem.quantity && { quantity: newItem.quantity }),
            ...(newItem.purchasePrice && {
              purchasePrice: newItem.purchasePrice,
            }),
            ...(newItem.sellingPrice && { sellingPrice: newItem.sellingPrice }),
            ...(newItem.description && { description: newItem.description }),
            ...(newItem.image && { image: newItem.image }),
          };
        }
        return product;
      });

      localStorage.setItem("stockData", JSON.stringify(updated));
      window.dispatchEvent(
        new CustomEvent("stockDataUpdated", {
          detail: { productId, updatedData: updated },
        })
      );
      toast.success("Item added successfully!");
      return updated;
    });
  };

  /**
   * Add a new product to stock
   * @param {Object} product - The product to add
   * @param {string} product.name - Name of the product
   * @param {number} product.variety - Number of variants
   */
  const handleAddProduct = async ({ name, variety }) => {
    const newProduct = {
      id: Date.now().toString(),
      name,
      variety: parseInt(variety) || 0,
      items: [],
    };
    setStockTable((prev) => {
      const updated = [...prev, newProduct];
      // Save to localStorage
      localStorage.setItem("stockData", JSON.stringify(updated));
      return updated;
    });
    // Close the modal
    setOpen(false);
  };

  const handleRemoveProduct = (productId) => {
    setStockTable((prev) => {
      const updated = prev.filter((product) => product.id !== productId);
      // Save to localStorage
      localStorage.setItem("stockData", JSON.stringify(updated));
      // Notify other components
      window.dispatchEvent(new Event("stockDataUpdated"));
      return updated;
    });
  };

  const handleAddItem = (productId, newItem) => {
    setStockTable((prev) => {
      const updated = prev.map((product) => {
        if (product.id === productId) {
          const updatedItems = [...(product.items || []), newItem];
          // If this is the current product being viewed, update inventoryItems
          if (id === productId) {
            setInventoryItems(updatedItems);
          }
          return {
            ...product,
            items: updatedItems,
            variety: updatedItems.length,
          };
        }
        return product;
      });
      // Save to localStorage
      localStorage.setItem("stockData", JSON.stringify(updated));

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("stockDataUpdated"));

      return updated;
    });
  };

  return (
    <Layout>
      {/* Top Header */}
      <HeaderUserCard />

      <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-6 rounded-xl">
        {/* Header Row */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Stock</h1>
          <Bell className="w-6 h-6 cursor-pointer" />
        </div>

        {/* Search + Date */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-4">
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

          <p className="text-lg font-semibold">
            Date: <span className="font-normal">2026/02/01</span>
          </p>
        </div>

        {/* Add Product */}
        <div className="mt-4">
          <button
            className="cursor-pointer flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setOpen(true)}
          >
            <Plus size={18} />
            Add Product
          </button>
          <AddProductModal
            open={open}
            onClose={() => setOpen(false)}
            onAdd={handleAddProduct}
            nextSN={String(stockTable.length + 1).padStart(3, "0")}
          />
        </div>

        {/* Stock Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse bg-[#FBFBF5] dark:bg-[#22231F] rounded-t-xl overflow-hidden">
            {/* TABLE HEADER */}
            <thead className="bg-[#FBFBF5] dark:bg-[#22231F] text-lg">
              <tr className="table w-full table-fixed">
                <th className="p-2">Product ID</th>
                <th className="p-2">Product Name</th>
                <th className="p-2">Product Variety</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            {/* SCROLLABLE BODY */}
            <tbody
              className="
                block 
                max-h-[280px] 
                overflow-y-auto 
                dark:bg-[#FBFBF5] 
                dark:text-[#22231F]
              "
            >
              {stockTable.map((row, i) => (
                <tr
                  key={i}
                  className="table w-full table-fixed text-center text-lg"
                >
                  <td className="p-2 border border-[#BDBDB8]">{row.id}</td>
                  <td className="p-2 border border-[#BDBDB8]">{row.name}</td>
                  <td className="p-2 border border-[#BDBDB8]">{row.variety}</td>
                  <td className="p-2 border border-[#BDBDB8]">
                    <div className="flex justify-center gap-3">
                      <Plus
                        size={24}
                        className="text-green-600 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          setSelectedProduct(row); // Make sure you have this state: const [selectedProduct, setSelectedProduct] = useState(null);
                          setOpenAddInventory(true); // Make sure you have this state: const [openAddInventory, setOpenAddInventory] = useState(false);
                        }}
                      />
                      <Eye
                        size={24}
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/stocks/preview/${row.id}`, {
                            replace: true,
                          });
                        }}
                      />
                      <Trash2
                        size={24}
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleRemoveProduct(row.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <InventoryModal
            open={openAddInventory}
            onClose={() => setOpenAddInventory(false)}
            product={selectedProduct}
            onAddItem={handleAddInventoryItem}
          />
        </div>

        {/* Charts + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mt-6">
          <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-5 rounded-xl shadow-md">
            <h2 className="font-semibold mb-4">Stock Performance</h2>
            <SeriesAreaChart
              data={areaData}
              xKey="year"
              areaKeys={areaKeys}
              colors={areaColors}
            />
          </div>

          {/* Recent Activity */}
          <div className="bg-[#FBFBF5] rounded-xl shadow-md">
            <div className="text-center bg-yellow-300 dark:bg-[#22231F] h-16 py-5 rounded-t-xl">
              <h2 className="font-semibold text-xl dark:text-[#FBFBF5]">
                Recent Activity
              </h2>
            </div>

            <ul className="space-y-3 text-sm">
              {activities.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center pb-2 pr-4 pl-4 pt-2 border-b dark:bg-[#FBFBF5] dark:text-[#22231F] m-1"
                >
                  <div>
                    <p className="font-semibold">{item.text}</p>
                    <p className="text-sm opacity-60">{item.addedBy}</p>
                  </div>
                  <span className="opacity-60 text-sm">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add Inventory Modal */}
      {openAddInventory && selectedProduct && (
        <InventoryModal
          open={openAddInventory}
          onClose={() => {
            setOpenAddInventory(false);
            setSelectedProduct(null);
          }}
          onAddItem={(newItem) => {
            handleAddInventoryItem(selectedProduct.id, newItem);
            setOpenAddInventory(false);
          }}
          product={selectedProduct}
        />
      )}
    </Layout>
  );
}

const AddProductModal = ({ open, onClose, onAdd, nextSN }) => {
  const [name, setName] = useState("");
  const [variety, setVariety] = useState("");

  const handleSubmit = () => {
    if (!name || !variety) return;

    onAdd({
      name,
      variety: Number(variety),
    });
    setName("");
    setVariety("");
  };
  // lock background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#FBFBF5] dark:bg-[#22231F] rounded-xl shadow-xl w-[520px] p-6 z-10">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 opacity-60 hover:opacity-100 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center">Add Product</h2>
        <p className="text-sm text-center opacity-60 mt-1">
          Fill the form to Add new Product in Inventory
        </p>

        {/* Form */}
        <div className="bg-[#E1E1DC] dark:bg-[#32332F] rounded-lg p-4 mt-6 grid grid-cols-3 gap-4 text-sm">
          {/* SN */}
          <div>
            <label className="font-semibold block mb-1">SN</label>
            <input
              disabled
              value={`${nextSN} (auto)`}
              className="w-full bg-white dark:bg-[#2A2A2A] px-3 py-2 rounded border opacity-70"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="font-semibold block mb-1">Product Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adult"
              className="w-full bg-white dark:bg-[#2A2A2A] px-3 py-2 rounded border"
            />
          </div>

          {/* Product Variety */}
          <div>
            <label className="font-semibold block mb-1">Product Variety</label>
            <input
              placeholder="5"
              type="number"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              className="w-full bg-white dark:bg-[#2A2A2A] px-3 py-2 rounded border"
            />
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            <Plus size={18} />
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};
