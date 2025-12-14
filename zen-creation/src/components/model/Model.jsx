import React, { useEffect } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const StatusCardModal = ({ open, onClose, status, title, body }) => {

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

  const statusStyles = {
    success: {
      bg: "bg-green-200",
      panel: "bg-green-300",
      icon: <CheckCircle className="w-12 h-12 text-green-700" />,
    },
    pending: {
      bg: "bg-yellow-200",
      panel: "bg-yellow-300",
      icon: <Clock className="w-12 h-12 text-yellow-700" />,
    },
    cancel: {
      bg: "bg-red-200",
      panel: "bg-red-300",
      icon: <XCircle className="w-12 h-12 text-red-700" />,
    },
  };

  const style = statusStyles[status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative p-6 rounded-xl shadow-xl max-w-xl w-full ${style.bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          {style.icon}

          <div
            className={`${style.panel} w-full text-center p-3 rounded-lg font-semibold text-gray-900 mt-4 cursor-pointer`}
            onClick={onClose}
          >
            {title}
          </div>

          <p className="mt-3 text-center text-gray-800 text-sm">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusCardModal;
