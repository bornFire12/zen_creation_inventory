import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
export default function NotificationSetting() {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="relative max-w-md mx-auto p-6 border border-gray-200 rounded-lg my-15">
        <h1 className="text-2xl font-semibold mb-6 pt-8">
          Notification Settings
        </h1>

        <div className="space-y-6  ">
          <button
            onClick={() => navigate(-1)}
            className="fixed left-75 top-6 text-gray-600 hover:text-gray-900 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 z-50"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex justify-between items-center">
            <label className="text-gray-700 dark:text-gray-300">
              Low Stock Item Alerts Notification
            </label>
            <label className="text-gray-700 dark:text-gray-300">
              Sales Report Alerts Notification
            </label>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="checkbox"
              className="w-5 h-5 text-gray-700 focus:ring-2 border-gray-300 focus:ring-gray-300"
            />
            <input
              type="checkbox"
              className="w-5 h-5 text-gray-700 rounded-full focus:ring-2 border-gray-300 focus:ring-gray-300"
            />
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-[#797979] hover:bg-[#666666] text-white px-8 py-2 rounded-lg">
              Update Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
