import { Dialog } from "@headlessui/react";
import { CheckCircle, Clock, Edit3, Globe, Plus, Tag, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Monitor {
  id?: string;
  name: string;
  url: string;
  check_interval_minutes?: string;
}

interface AddMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Monitor>) => void;
  initialData?: Monitor | null;
  isEditMode?: boolean;
}

export default function AddMonitorModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditMode = false,
}: AddMonitorModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    check_interval_minutes: "5",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({
        name: initialData.name || "",
        url: initialData.url || "",
        check_interval_minutes: initialData.check_interval_minutes || "5",
      });
    } else if (!isEditMode) {
      setFormData({ name: "", url: "", check_interval_minutes: "5" });
    }
  }, [initialData, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      if (!formData.name.trim() || !formData.url.trim()) {
        setError("Name and URL are required");
        return;
      }

      try {
        new URL(formData.url);
      } catch {
        setError("Please enter a valid URL");
        return;
      }

      await onSave(formData);

      setError("");
    } catch (error) {
      console.error(`${isEditMode ? "Update" : "Registration"} failed:`, error);
      setError("Failed to save monitor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isSubmitting) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      {/* Backdrop with blur effect */}
      <div className="flex items-center justify-center min-h-screen bg-black/60 backdrop-blur-sm p-4">
        <Dialog.Panel className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-3xl p-8 w-full max-w-lg border border-slate-600/50 shadow-2xl overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-70" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />

          {/* Header */}
          <div className="relative flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-2xl shadow-lg ${
                  isEditMode
                    ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
                    : "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
                }`}
              >
                {isEditMode ? (
                  <Edit3 className="w-6 h-6 text-orange-400" />
                ) : (
                  <Plus className="w-6 h-6 text-blue-400" />
                )}
              </div>
              <div>
                <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {isEditMode ? "Edit Monitor" : "Add New Monitor"}
                </Dialog.Title>
                <p className="text-gray-400 text-sm mt-1">
                  {isEditMode
                    ? "Update your monitoring configuration"
                    : "Start monitoring a new service"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="group p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-300"
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Form */}
          <div className="relative space-y-6">
            {/* Monitor Name */}
            <div className="group">
              <label
                htmlFor="name"
                className="flex items-center space-x-2 text-sm font-medium text-slate-300 mb-3"
              >
                <Tag className="w-4 h-4 text-blue-400" />
                <span>Monitor Name</span>
              </label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., My Website"
                  className="w-full rounded-2xl px-4 py-4 bg-slate-700/50 text-white border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400 hover:border-slate-500/50"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Monitor URL */}
            <div className="group">
              <label
                htmlFor="url"
                className="flex items-center space-x-2 text-sm font-medium text-slate-300 mb-3"
              >
                <Globe className="w-4 h-4 text-green-400" />
                <span>Monitor URL</span>
              </label>
              <div className="relative">
                <input
                  id="url"
                  name="url"
                  type="url"
                  value={formData.url}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="https://example.com"
                  className="w-full rounded-2xl px-4 py-4 bg-slate-700/50 text-white border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 placeholder-slate-400 hover:border-slate-500/50"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Check Interval */}
            <div className="group">
              <label
                htmlFor="interval"
                className="flex items-center space-x-2 text-sm font-medium text-slate-300 mb-3"
              >
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Check Interval</span>
              </label>
              <div className="relative">
                <select
                  id="check_interval_minutes"
                  name="check_interval_minutes"
                  value={formData.check_interval_minutes}
                  onChange={handleChange}
                  className="w-full rounded-2xl px-4 py-4 bg-slate-700/50 text-white border border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 cursor-pointer appearance-none hover:border-slate-500/50"
                >
                  {[
                    { value: "1", label: "1 minute" },
                    { value: "5", label: "5 minutes" },
                    { value: "10", label: "10 minutes" },
                    { value: "15", label: "15 minutes" },
                    { value: "30", label: "30 minutes" },
                    { value: "60", label: "1 hour" },
                  ].map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 border-r-2 border-b-2 border-slate-400 transform rotate-45" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl">
                <div className="p-1 bg-red-500/20 rounded-lg">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="relative flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-700/50">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="group px-6 py-3 bg-slate-700/50 text-white rounded-2xl hover:bg-slate-600/50 transition-all duration-300 font-medium border border-slate-600/50 hover:border-slate-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="group-hover:scale-105 transition-transform duration-300 inline-block">
                Cancel
              </span>
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    {isEditMode ? (
                      <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    )}
                    <span className="group-hover:scale-105 transition-transform duration-300">
                      {isEditMode ? "Update Monitor" : "Create Monitor"}
                    </span>
                  </>
                )}
              </div>
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
