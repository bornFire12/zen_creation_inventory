import { Trash2, Printer, Download, X } from "lucide-react";
import { useEffect } from "react";

const reports = [
  {
    date: "2026/02/01",
    name: "Baseball Cap",
    color: "Green",
    size: "Large",
    quantity: 3,
    purchasePrice: "2000/-",
    sellingPrice: "2500/-",
    totalValue: "7500/-",
    profit: "1500",
    description:
      "Classic NY Embroidered Baseball Cap Casual Streetwear Adjustable Sports Hat for Men and Women",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
  },
  {
    date: "2026/02/01",
    name: "Baseball Cap",
    color: "Green",
    size: "Large",
    quantity: 3,
    purchasePrice: "2000/-",
    sellingPrice: "2500/-",
    totalValue: "7500/-",
    profit: "1500",
    description:
      "Classic NY Embroidered Baseball Cap Casual Streetwear Adjustable Sports Hat for Men and Women",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
  },
  {
    date: "2026/02/01",
    name: "Baseball Cap",
    color: "Green",
    size: "Large",
    quantity: 3,
    purchasePrice: "2000/-",
    sellingPrice: "2500/-",
    totalValue: "7500/-",
    profit: "1500",
    description:
      "Classic NY Embroidered Baseball Cap Casual Streetwear Adjustable Sports Hat for Men and Women",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
  },
  {
    date: "2026/02/01",
    name: "Baseball Cap",
    color: "Green",
    size: "Large",
    quantity: 3,
    purchasePrice: "2000/-",
    sellingPrice: "2500/-",
    totalValue: "7500/-",
    profit: "1500",
    description:
      "Classic NY Embroidered Baseball Cap Casual Streetwear Adjustable Sports Hat for Men and Women",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
  },
  {
    date: "2026/02/01",
    name: "Baseball Cap",
    color: "Green",
    size: "Large",
    quantity: 3,
    purchasePrice: "2000/-",
    sellingPrice: "2500/-",
    totalValue: "7500/-",
    profit: "1500",
    description:
      "Classic NY Embroidered Baseball Cap Casual Streetwear Adjustable Sports Hat for Men and Women",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
  },
];

export default function SalesReportModal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // ✅ Cleanup (important)
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative z-10 bg-[#E1E1DC] dark:bg-[#43433F] rounded-xl w-[95%] max-w-5xl h-[85vh] p-5 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Sales Report</h1>
          <button
            onClick={onClose}
            className="opacity-60 hover:opacity-100 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {reports.map((report, index) => (
            <SalesReportCard key={index} data={report} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SalesReportCard = ({ data }) => {
  return (
    <div className="bg-[#FBFBF5] dark:bg-[#22231F] rounded-xl p-4 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-4">
      {/* Image */}
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-[240px] object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex flex-col justify-between">
        {/* Top Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-1 text-lg">
            <p>
              <strong>Date:</strong> {data.date}
            </p>
            <p>
              <strong>Item Name:</strong> {data.name}
            </p>
            <p>
              <strong>Color:</strong> {data.color}
            </p>
            <p>
              <strong>Size:</strong> {data.size}
            </p>
            <p>
              <strong>Quantity:</strong> {data.quantity}
            </p>
          </div>

          <div className="space-y-1 text-lg">
            <p>
              <strong>Purchase Price:</strong> {data.purchasePrice}/-
            </p>
            <p>
              <strong>Selling Price:</strong> {data.sellingPrice}/-
            </p>
            <p>
              <strong>Total Value:</strong> {data.totalValue}/-
            </p>
            <p className="text-green-600 font-semibold">
              Profit: {data.profit}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm opacity-70 mt-3">
          <strong>Description:</strong> {data.description}
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-4 text-lg">
          <button className="cursor-pointer flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg">
            <Trash2 size={14} /> Delete Report
          </button>

          <button className="cursor-pointer flex items-center gap-2 bg-gray-700 text-white px-3 py-1.5 rounded-lg">
            <Printer size={14} /> Print Report
          </button>

          <button className="cursor-pointer flex items-center gap-2 bg-indigo-500 text-white px-3 py-1.5 rounded-lg">
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};
