import { ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const InventoryModal = ({ open, onClose, product, onAddItem }) => {
  const initalItem = {
    name: "",
    size: "",
    quantity: "",
    color: "",
    purchasePrice: "",
    sellingPrice: "",
    description: "",
    image: "",
  };
  const [item, setItem] = useState(initalItem);
  const fileInputRef = useRef(null);

  const totalValue = item.quantity * item.sellingPrice;
  const profit = item.quantity * (item.sellingPrice - item.purchasePrice);

  // lock background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  if (!open || !product) return null;

  const handleAdd = () => {
    if (!isItemValid(item)) {
      return;
    }

    onAddItem(product.id, {
      ...item,
      totalValue,
      profit,
    });
    setItem(initalItem);
    onClose(); // close modal
  };

  const isItemValid = (data) => {
    return Object.values(data).every(
      (value) => value !== "" && value !== null && value !== undefined
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setItem((prev) => ({
        ...prev,
        image: reader.result, // base64 preview
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* modal */}
      <div className="relative z-10 bg-[#FBFBF5] dark:bg-[#22231F] rounded-xl w-[700px] p-6 shadow-xl">
        {/* close */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute right-4 top-4 opacity-60 hover:opacity-100"
        >
          <X />
        </button>

        <h2 className="text-3xl font-semibold text-center">
          Add to {product.name} Inventory
        </h2>
        <p className="text-lg text-center opacity-60 mt-1">
          Fill this Inventory Form and Your item will appear on Item View
          Section.
        </p>
        <div className="flex flex-col gap-0 rounded-lg border border-[#BDBDB8] mt-5.5 p-5.5 dark:bg-[#43433F] dark:border-none">
          {/* IMAGE UPLOAD */}
          <div
            className="mt-4 rounded-lg overflow-hidden cursor-pointer border-2 border-dashed border-[#BDBDB8] flex items-center justify-center h-[220px] bg-[#EFEFEA]"
            onClick={handleImageClick}
          >
            {item.image ? (
              <img
                src={item.image}
                className="w-full h-full object-cover"
                alt="item"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <ImagePlus size={40} />
                <span className="text-lg font-semibold">Add Image</span>
                <span className="text-sm opacity-60">Click to upload</span>
              </div>
            )}
          </div>

          {/* HIDDEN FILE INPUT */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          {/* form */}
          <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
            <Input
              inputType={"text"}
              label="Name"
              value={item.name}
              onChange={(value) => setItem({ ...item, name: value })}
            />
            <Input
              inputType={"number"}
              label="Size"
              value={item.size}
              onChange={(value) => setItem({ ...item, size: value })}
            />
            <Input
              inputType={"number"}
              label="Quantity"
              value={item.quantity}
              onChange={(value) =>
                setItem({ ...item, quantity: Number(value) })
              }
            />
            <Input
              inputType={"text"}
              label="Color"
              value={item.color}
              onChange={(value) => setItem({ ...item, color: value })}
            />
            <Input
              inputType={"number"}
              label="Purchase Price"
              value={item.purchasePrice}
              onChange={(value) =>
                setItem({ ...item, purchasePrice: Number(value) })
              }
            />
            <Input
              inputType={"number"}
              label="Selling Price"
              value={item.sellingPrice}
              onChange={(value) =>
                setItem({ ...item, sellingPrice: Number(value) })
              }
            />
            <Field label="Total Value" value={`${totalValue} (auto)`} />
            <Field label="Profit" value={`${profit} (auto)`} />
          </div>

          {/* description */}
          <div className="mt-4">
            <label className="text-lg font-semibold">Item Description</label>
            <textarea
              className="w-full mt-1 rounded-lg p-2 border-none bg-[#EFEFEA] outline-none border-b-[#BDBDB8] dark:text-[#22231F]"
              rows={2}
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
            />
          </div>

          {/* actions */}
          <div className="flex justify-between gap-4 mt-6">
            <button
              className="cursor-pointer flex-1 bg-green-700 text-white py-2 rounded-lg text-lg"
              onClick={handleAdd}
            >
              Add Item
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer flex-1 bg-red-600 text-white py-2 rounded-lg text-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryModal;

const Field = ({ label, value }) => (
  <div>
    <label className="font-semibold text-lg">{label}</label>
    <div className="px-3 py-2 rounded mt-1 bg-[#EFEFEA] outline-none dark:text-[#22231F]">
      {value}
    </div>
  </div>
);

const Input = ({ label, value, inputType, onChange }) => (
  <div>
    <label className="font-semibold text-lg">{label}</label>
    <input
      type={inputType}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border-none rounded mt-1 bg-[#EFEFEA] outline-none border-b-[#BDBDB8] dark:text-[#22231F]"
    />
  </div>
);
