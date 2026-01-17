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
  ImagePlus,
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
  const [financials, setFinancials] = useState({
    totalValue: 0,
    totalProfit: 0,
    profitPercentage: "0.0",
  });

  // Load product data on mount and when id changes
  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        const savedData = JSON.parse(localStorage.getItem("stockData")) || [];
        const product = savedData.find((item) => item.id === id);
        if (!product) {
          console.log("Product not found, navigating back to /stocks");
          navigate("/stocks", { replace: true });
          return;
        }
        console.log("Product found:", product);
        setStockItem(product);
        setInventoryItems(product.items || []);
      } catch (err) {
        console.error("Error loading product data:", err);
        setError("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      console.log("Loading product data for ID:", id);
      loadProductData();
    } else {
      console.error("No product ID provided");
      navigate("/stocks", { replace: true });
    }
  }, [id, navigate]);
  useEffect(() => {
    console.log("Current stockItem:", stockItem);
    console.log("Inventory items:", inventoryItems);
  }, [stockItem, inventoryItems]);

  // Listen for storage changes
  useEffect(() => {
    const handleStorageUpdate = () => {
      console.log("Storage updated, reloading product data");
      const savedData = JSON.parse(localStorage.getItem("stockData")) || [];
      const product = savedData.find((item) => item.id === id);
      if (!product) {
        console.log("Product no longer exists, navigating back");
        navigate("/stocks", { replace: true });
      } else {
        console.log("Updating product data from storage");
        setStockItem(product);
        setInventoryItems(product.items || []);
      }
    };
    window.addEventListener("stockDataUpdated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);
    return () => {
      window.removeEventListener("stockDataUpdated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, [id, navigate]);

  useEffect(() => {
    if (inventoryItems && inventoryItems.length > 0) {
      // Calculate total value and profit from all inventory items
      const { totalValue, totalProfit } = inventoryItems.reduce(
        (acc, item) => {
          const quantity = parseFloat(item.quantity) || 0;
          const purchasePrice = parseFloat(item.purchasePrice) || 0;
          const sellingPrice = parseFloat(item.sellingPrice) || 0;

          const itemValue = quantity * purchasePrice;
          const itemProfit = quantity * (sellingPrice - purchasePrice);

          return {
            totalValue: acc.totalValue + itemValue,
            totalProfit: acc.totalProfit + itemProfit,
          };
        },
        { totalValue: 0, totalProfit: 0 }
      );

      // Calculate profit percentage
      const profitPercentage =
        totalValue > 0 ? ((totalProfit / totalValue) * 100).toFixed(1) : "0.0";

      setFinancials({
        totalValue,
        totalProfit,
        profitPercentage,
      });
    } else {
      // If no inventory items, use stockItem data if available
      if (stockItem) {
        const quantity = parseFloat(stockItem.quantity) || 0;
        const purchasePrice = parseFloat(stockItem.purchasePrice) || 0;
        const sellingPrice = parseFloat(stockItem.sellingPrice) || 0;

        const totalValue = quantity * purchasePrice;
        const profitPerUnit = sellingPrice - purchasePrice;
        const totalProfit = profitPerUnit * quantity;
        const profitPercentage =
          purchasePrice > 0
            ? ((profitPerUnit / purchasePrice) * 100).toFixed(1)
            : "0.0";

        setFinancials({
          totalValue,
          totalProfit,
          profitPercentage,
        });
      } else {
        setFinancials({
          totalValue: 0,
          totalProfit: 0,
          profitPercentage: "0.0",
        });
      }
    }
  }, [stockItem, inventoryItems]);
  useEffect(() => {
    const handleStorageUpdate = () => {
      // Reload the product data when stockData is updated
      const savedData = JSON.parse(localStorage.getItem("stockData")) || [];
      const product = savedData.find((item) => item.id === id);

      if (!product) {
        // If product was deleted, navigate away
        navigate("/stocks");
      } else {
        setStockItem(product);
        setInventoryItems(product.items || []);
      }
    };
    window.addEventListener("stockDataUpdated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("stockDataUpdated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, [id, navigate]);
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
    // Calculate financials before updating
    const quantity = parseFloat(editFormData.quantity) || 0;
    const purchasePrice = parseFloat(editFormData.purchasePrice) || 0;
    const sellingPrice = parseFloat(editFormData.sellingPrice) || 0;
    const profitPerUnit = sellingPrice - purchasePrice;
    const totalProfit = profitPerUnit * quantity;
    const profitPercentage =
      purchasePrice > 0
        ? ((profitPerUnit / purchasePrice) * 100).toFixed(1)
        : "0.0";

    // Update stock item
    setStockItem((prev) => ({
      ...prev,
      ...editFormData,
    }));

    // Update financials
    setFinancials({
      totalValue: quantity * purchasePrice,
      totalProfit,
      profitPercentage,
    });

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
      purchasePrice > 0
        ? ((profitPerUnit / purchasePrice) * 100).toFixed(1)
        : "0.0";
    return {
      totalValue,
      totalProfit,
      profitPercentage,
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
        <div className="p-4">Product not found</div>
      </Layout>
    );
  }
  // Use the values from financials state which already has proper null checks

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
                {stockItem?.image ? (
                  <img
                    src={stockItem.image}
                    alt={stockItem.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <ImagePlus size={24} className="text-gray-400" />
                  </div>
                )}
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
                      <span className="font-medium">Name:</span>{" "}
                      {stockItem?.name}
                    </p>
                    <p>
                      <span className="font-medium">Size:</span>{" "}
                      {stockItem?.size}
                    </p>
                    <p>
                      <span className="font-medium">Color:</span>{" "}
                      {stockItem?.color}
                    </p>
                    <p>
                      <span className="font-medium">Quantity:</span>{" "}
                      {stockItem?.quantity}
                    </p>
                    <p>
                      <span className="font-medium">Purchase Price:</span> $
                      {stockItem?.purchasePrice?.toFixed(2) || "0.00"}
                    </p>
                    <p>
                      <span className="font-medium">Selling Price:</span> $
                      {stockItem?.sellingPrice?.toFixed(2) || "0.00"}
                    </p>
                    <p>
                      <span className="font-medium">Profit per Unit:</span>
                      <span
                        className={
                          financials.totalProfit /
                            (parseFloat(stockItem?.quantity) || 1) >=
                          0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        $
                        {Math.abs(
                          financials.totalProfit /
                            (parseFloat(stockItem?.quantity) || 1)
                        ).toFixed(2)}{" "}
                        ({financials.profitPercentage}%)
                      </span>
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
                      {(stockItem?.purchasePrice || 0).toFixed(2)}
                    </p>
                    <p>
                      <span className="font-medium">Selling Price:</span> $
                      {(stockItem?.sellingPrice || 0).toFixed(2)}
                    </p>
                    <p>
                      <span className="font-medium">Profit per Unit:</span>
                      <span
                        className={
                          financials.totalProfit /
                            (parseFloat(stockItem?.quantity) || 1) >=
                          0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        $
                        {Math.abs(
                          financials.totalProfit /
                            (parseFloat(stockItem?.quantity) || 1)
                        ).toFixed(2)}{" "}
                        ({financials.profitPercentage}%)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          {!loading && stockItem && (
            <div className="mt-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Financial Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total Value
                    </p>
                    <p className="text-lg font-semibold">
                      ${(financials.totalValue || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Potential Profit
                    </p>
                    <p
                      className={`text-lg font-semibold ${
                        (financials.totalProfit || 0) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      ${Math.abs(financials.totalProfit || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded">
                    {" "}
                    {/* Added missing 'div' here */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Profit Margin
                    </p>
                    <p
                      className={`text-lg font-semibold ${
                        parseFloat(financials?.profitPercentage || 0) >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {financials?.profitPercentage || "0.0"}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  <div className="mt-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Financial Summary
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Value
                          </p>
                          <p className="text-lg font-semibold">
                            ${(financials.totalValue || 0).toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Potential Profit
                          </p>
                          <p
                            className={`text-lg font-semibold ${
                              (financials.totalProfit || 0) >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            ${Math.abs(financials.totalProfit || 0).toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Profit Margin
                          </p>
                          <p
                            className={`text-lg font-semibold ${
                              parseFloat(financials.profitPercentage || 0) >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {financials.profitPercentage || "0.0"}%
                          </p>
                        </div>
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
      </div>
    </Layout>
  );
};

export default StockPreview;
