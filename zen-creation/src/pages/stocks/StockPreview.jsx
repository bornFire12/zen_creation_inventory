import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import HeaderUserCard from "../../components/HeaderUserCard";
import StatusCardModal from "../../components/model/Model";
import {
  ArrowLeft,
  Trash2,
  Edit2,
  DollarSign,
  Plus,
  X,
  ShoppingCart,
} from "lucide-react";

const StockPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stockItem, setStockItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAddInventory, setOpenAddInventory] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    size: "",
    purchasePrice: 0,
    sellingPrice: 0,
    quantity: 0,
  });

  // Fetch stock item data
  useEffect(() => {
    const fetchStockItem = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this data from your API
        // const response = await fetch(`/api/stocks/${id}`);
        // if (!response.ok) throw new Error('Failed to fetch stock item');
        // const data = await response.json();

        // Mock data - replace with actual API call
        const mockData = {
          id: id,
          name: id === "001" ? "Baseball Cap" : "Running Shoes",
          variety: id === "001" ? 2 : 1,
          description:
            id === "001"
              ? "High-quality cotton baseball cap with adjustable strap"
              : "Lightweight running shoes with cushioned soles",
          image:
            id === "001"
              ? "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              : "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          size: id === "001" ? "One Size" : "US 10",
          quantity: id === "001" ? 50 : 30,
          purchasePrice: id === "001" ? 15.99 : 29.99,
          sellingPrice: id === "001" ? 24.99 : 59.99,
          lastUpdated: "2024-01-03",
          items: [],
        };

        setStockItem(mockData);
        setInventoryItems(mockData.items || []);
      } catch (err) {
        console.error("Error fetching stock item:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockItem();
  }, [id]);

  const handleBack = () => {
    navigate("/stocks");
  };

  const handleAddInventory = (newItem) => {
    // In a real app, you would make an API call here
    setInventoryItems((prev) => [
      ...prev,
      { ...newItem, id: Date.now().toString() },
    ]);
    // Show success message or update UI
  };

  const handleEditClick = () => {
    setEditFormData({
      name: stockItem.name,
      description: stockItem.description,
      size: stockItem.size,
      purchasePrice: stockItem.purchasePrice,
      sellingPrice: stockItem.sellingPrice,
      quantity: stockItem.quantity,
    });
    setOpenEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would update the item via API here
    setStockItem((prev) => ({
      ...prev,
      ...editFormData,
    }));
    setOpenEditModal(false);
  };

  const calculateDerivedValues = (formData) => {
    const quantity = parseFloat(formData.quantity) || 0;
    const purchasePrice = parseFloat(formData.purchasePrice) || 0;
    const sellingPrice = parseFloat(formData.sellingPrice) || 0;

    const totalValue = quantity * purchasePrice;
    const profitPerUnit = sellingPrice - purchasePrice;
    const totalProfit = profitPerUnit * quantity;
    const profitPercentage =
      purchasePrice > 0 ? (profitPerUnit / purchasePrice) * 100 : 0;

    return {
      totalValue,
      totalProfit,
      profitPercentage: profitPercentage.toFixed(1),
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...editFormData,
      [name]:
        name === "purchasePrice" ||
        name === "sellingPrice" ||
        name === "quantity"
          ? parseFloat(value) || 0
          : value,
    };

    const derivedValues = calculateDerivedValues(newFormData);

    setEditFormData(newFormData);
  };

  const handleDeleteItem = (itemId) => {
    // In a real app, you would make an API call here
    setInventoryItems((prev) => prev.filter((item) => item.id !== itemId));
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

  if (error) {
    return (
      <Layout>
        <div className="p-4 text-red-500">Error: {error}</div>
      </Layout>
    );
  }

  if (!stockItem) {
    return (
      <Layout>
        <div className="p-4">Stock item not found</div>
      </Layout>
    );
  }

  // Calculate derived values
  const totalValue = stockItem.quantity * stockItem.purchasePrice;
  const profitPerUnit = stockItem.sellingPrice - stockItem.purchasePrice;
  const totalProfit = profitPerUnit * stockItem.quantity;
  const profitPercentage = (
    (profitPerUnit / stockItem.purchasePrice) *
    100
  ).toFixed(1);

  return (
    <Layout>
      <HeaderUserCard />

      <div className="bg-[#E1E1DC] dark:bg-[#43433F] p-6 rounded-xl">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-semibold">{stockItem.name} - Details</h1>
        </div>

        {/* Stock Item Details */}
        <div className="bg-[#FBFBF5] dark:bg-[#22231F] p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <img
                  src={stockItem.image}
                  alt={stockItem.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{stockItem.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {stockItem.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">
                    Basic Information
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="font-medium">Product ID:</span>{" "}
                      {stockItem.id}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span>{" "}
                      {stockItem.size}
                    </p>
                    <p>
                      <span className="font-medium">Quantity:</span>{" "}
                      {stockItem.quantity} units
                    </p>
                    <p>
                      <span className="font-medium">Last Updated:</span>{" "}
                      {new Date(stockItem.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">
                    Pricing
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p>
                      <span className="font-medium">Purchase Price:</span> $
                      {stockItem.purchasePrice.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-medium">Selling Price:</span> $
                      {stockItem.sellingPrice.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-medium">Profit per Unit:</span>
                      <span
                        className={
                          profitPerUnit >= 0 ? "text-green-600" : "text-red-600"
                        }
                      >
                        ${Math.abs(profitPerUnit).toFixed(2)} (
                        {profitPercentage}%)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg md:col-span-2">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">
                    Financial Summary
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Investment
                      </p>
                      <p className="text-lg font-semibold">
                        ${totalValue.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Potential Revenue
                      </p>
                      <p className="text-lg font-semibold">
                        $
                        {(stockItem.quantity * stockItem.sellingPrice).toFixed(
                          2
                        )}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Profit
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          totalProfit >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        ${Math.abs(totalProfit).toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-3 rounded">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Stock Status
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          stockItem.quantity > 10
                            ? "text-green-600"
                            : stockItem.quantity > 5
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {stockItem.quantity > 10
                          ? "In Stock"
                          : stockItem.quantity > 5
                          ? "Low Stock"
                          : "Critical Stock"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-4 justify-end">
          <button
            onClick={() => {
              // Handle remove item
              if (
                window.confirm(
                  `Are you sure you want to remove ${stockItem.name}?`
                )
              ) {
                // In a real app, you would call an API to delete the item
                console.log("Removing item:", stockItem.id);
                // Then navigate back to stocks list
                navigate("/stocks");
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={18} />
            Remove Item
          </button>

          <button
            onClick={handleEditClick}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 size={18} />
            Edit Item
          </button>

          <button
            onClick={() => {
              // Handle sales
              console.log("Processing sale for:", stockItem.id);
              // In a real app, you would navigate to a sales page or open a sales modal
              alert("Sales functionality will be implemented here");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <DollarSign size={18} />
            Record Sale
          </button>

          <button
            onClick={() => {
              // Navigate to sales page
              navigate("/sales-page");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ShoppingCart size={18} />
            Go to Sales Page
          </button>
        </div>

        {/* Add Inventory Modal */}
        <StatusCardModal
          open={openAddInventory}
          onClose={() => setOpenAddInventory(false)}
          status="info"
          title="Add Inventory Item"
          body={
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Purchase Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Enter purchase price"
                />
              </div>
              <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // In a real app, you would collect the form data and make an API call
                  handleAddInventory({
                    name: "New Item",
                    quantity: 1,
                    purchasePrice: 0,
                  });
                  setOpenAddInventory(false);
                }}
              >
                Add Item
              </button>
            </div>
          }
        />

        {/* Edit Item Modal */}
        {openEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 relative">
              <button
                onClick={() => setOpenEditModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Edit Item
              </h2>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={editFormData.size}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={editFormData.quantity}
                      onChange={handleInputChange}
                      min="0"
                      step="1"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Purchase Price ($)
                    </label>
                    <input
                      type="number"
                      name="purchasePrice"
                      value={editFormData.purchasePrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Selling Price ($)
                    </label>
                    <input
                      type="number"
                      name="sellingPrice"
                      value={editFormData.sellingPrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mt-4">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Financial Summary
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Value
                      </p>
                      <p className="text-lg font-semibold">
                        $
                        {(
                          editFormData.quantity * editFormData.purchasePrice
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Potential Profit
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          editFormData.sellingPrice -
                            editFormData.purchasePrice >=
                          0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        $
                        {(
                          (editFormData.sellingPrice -
                            editFormData.purchasePrice) *
                          editFormData.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Profit Margin
                      </p>
                      <p
                        className={`text-lg font-semibold ${
                          editFormData.sellingPrice -
                            editFormData.purchasePrice >=
                          0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {editFormData.purchasePrice > 0
                          ? `${(
                              ((editFormData.sellingPrice -
                                editFormData.purchasePrice) /
                                editFormData.purchasePrice) *
                              100
                            ).toFixed(1)}%`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpenEditModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StockPreview;
