// /Users/prason/Documents/React Projects/zenCreation/zen-creation/src/pages/stocks/SalesPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X, Search } from "lucide-react";
import Layout from "../../components/layout/Layout";

const SalesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products] = useState([
    { id: 1, name: "Baseball Cap", price: 25.99, stock: 50 },
    { id: 2, name: "Running Shoes", price: 89.99, stock: 30 },
    { id: 3, name: "T-Shirt", price: 19.99, stock: 100 },
  ]);

  const subtotal = selectedProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleAddProduct = (product) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setSelectedProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity } : p))
    );
  };

  const removeProduct = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCheckout = () => {
    console.log("Processing sale:", {
      items: selectedProducts,
      total,
    });
    alert("Sale completed successfully!");
    setSelectedProducts([]);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Sales</h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
          >
            <ArrowLeft size={20} /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {products
                  .filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleAddProduct(product)}
                    >
                      <div className="h-24 bg-gray-100 dark:bg-gray-600 rounded mb-2"></div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${product.price.toFixed(2)} • {product.stock} in stock
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
              {selectedProducts.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No items added</p>
              ) : (
                selectedProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded"
                        >
                          +
                        </button>
                        <span className="ml-2">× ${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProduct(item.id);
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedProducts.length === 0}
              className={`w-full mt-6 py-3 rounded-lg font-medium ${
                selectedProducts.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Complete Sale (${total.toFixed(2)})
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesPage;
