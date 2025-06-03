import { saveMonitor } from "@/lib/monitor-api";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useState } from "react";

export default function AddMonitorModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    interval: "5",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      await saveMonitor(formData);
    } catch (error) {
      console.error("Registration failed:", error);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="flex items-center justify-center min-h-screen bg-black/50 p-4">
        <Dialog.Panel className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-bold text-white">
              Add New Monitor
            </Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-slate-300 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Monitor Name"
                className="w-full rounded-lg px-3 py-2 bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="url"
                className="block text-sm text-slate-300 mb-1"
              >
                URL
              </label>
              <input
                id="url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="Monitor URL"
                className="w-full rounded-lg px-3 py-2 bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="interval"
                className="block text-sm text-slate-300 mb-1"
              >
                Check Interval (minutes)
              </label>
              <select
                id="interval"
                name="interval"
                value={formData.interval}
                onChange={handleChange}
                className="w-full rounded-lg px-3 py-2 bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring focus:ring-blue-500"
              >
                {[1, 5, 10, 15, 30, 60].map((val) => (
                  <option key={val} value={val}>
                    {val} minutes
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              Save Monitor
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
