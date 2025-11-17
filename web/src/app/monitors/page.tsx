"use client";

import AddMonitorModal from "@/components/AddMonitorModal";
import Header from "@/components/Header";
import dayjs from "@/lib/dayjs";
import {
  deleteMonitor,
  getAllMonitors,
  saveMonitor,
  updateMonitor,
} from "@/lib/monitor-api";
import { themeClasses } from "@/theme";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  Monitor,
  MoreVertical,
  Plus,
  RefreshCw,
  Trash2,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Monitor {
  id: string;
  name: string;
  url: string;
  status: string;
  response_time: number;
  last_checked_at: string;
  created_at: string;
  check_interval_minutes?: number;
}

export default function Monitors() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [stats, setStats] = useState({
    online: 0,
    offline: 0,
    unknown: 0,
    health: 0,
    avgResponseTime: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState<Monitor | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const fetchMonitors = useCallback(async () => {
    try {
      setLoading(true);
      const response: Monitor[] = await getAllMonitors();
      const data = response || [];

      setMonitors(data);

      const online = data.filter((m: Monitor) => m.status === "UP").length;
      const offline = data.filter((m: Monitor) => m.status === "DOWN").length;
      const unknown = data.filter(
        (m: Monitor) => m.status !== "UP" && m.status !== "DOWN",
      ).length;
      const health = Math.round((online / data.length) * 100 || 0);
      const avgResponseTime = Math.round(
        data
          .filter((m: Monitor) => m.response_time)
          .reduce(
            (sum: number, m: Monitor) => sum + (m.response_time || 0),
            0,
          ) / data.length,
      );
      setStats({
        online,
        offline,
        unknown,
        health,
        avgResponseTime,
      });
    } catch (error) {
      console.error("Error fetching queue data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonitors();
    const interval = setInterval(fetchMonitors, 50000);
    return () => clearInterval(interval);
  }, [fetchMonitors]);

  const filteredMonitors = useMemo(() => {
    switch (activeFilter) {
      case "Online":
        return monitors.filter((m: Monitor) => m.status === "UP");
      case "Offline":
        return monitors.filter((m: Monitor) => m.status === "DOWN");
      case "Unknown":
        return monitors.filter((m: Monitor) => m.status === "UNKNOWN");
      default:
        return monitors;
    }
  }, [monitors, activeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UP":
        return "bg-green-600";
      case "DOWN":
        return "bg-red-600";
      case "UNKNOWN":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "UP":
        return <CheckCircle className="w-4 h-4" />;
      case "DOWN":
        return <XCircle className="w-4 h-4" />;
      case "UNKNOWN":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const handleEditMonitor = (monitor: Monitor) => {
    setSelectedMonitor(monitor);
    setShowEditModal(true);
    setDropdownOpen(null);
  };

  const handleDeleteMonitor = async (monitorId: string) => {
    try {
      await deleteMonitor(monitorId);
      await fetchMonitors();
      setDropdownOpen(null);
    } catch (error) {
      console.error("Error deleting monitor:", error);
    }
  };

  const handleDeleteAllMonitors = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete all monitors? This action cannot be undone.",
      )
    ) {
      try {
        setLoading(true);
        await Promise.all(monitors.map((monitor) => deleteMonitor(monitor.id)));
        await fetchMonitors();
      } catch (error) {
        console.error("Error deleting all monitors:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async (newMonitor: Partial<Monitor>) => {
    const res = await saveMonitor(newMonitor);
    if (res) {
      await fetchMonitors();
      setShowAddModal(false);
    }
  };

  const handleSaveEdit = async (updatedMonitor: Partial<Monitor>) => {
    if (selectedMonitor) {
      const res = await updateMonitor(selectedMonitor.id, updatedMonitor);
      if (res) {
        setShowEditModal(false);
        setSelectedMonitor(null);
        await fetchMonitors();
      }
    }
  };

  const toggleDropdown = (monitorId: string) => {
    setDropdownOpen(dropdownOpen === monitorId ? null : monitorId);
  };

  return (
    <div className={themeClasses.page}>
      {/* Header */}
      <Header activeTab="monitors" />

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Monitor Dashboard
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Real-time monitoring of your websites and services
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={fetchMonitors}
              className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-600"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin">
                  <RefreshCw className="w-5 h-5 text-blue-400" />
                </span>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 text-blue-400 group-hover:rotate-180 transition-transform duration-300" />
                  <span className="text-white font-medium">Refresh</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 text-white"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add Monitor</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Monitors */}
          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  Total Monitors
                </h3>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Activity className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {monitors.length}
              </div>
              <div className="text-sm text-gray-500">
                Active monitoring services
              </div>
            </div>
          </div>

          {/* Online Services */}
          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  Online Services
                </h3>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                {stats.online}
              </div>
              <div className="text-sm text-gray-500">Running smoothly</div>
            </div>
          </div>

          {/* System Uptime */}
          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  System Uptime
                </h3>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {stats.health}%
              </div>
              <div className="text-sm text-gray-500">Overall health score</div>
            </div>
          </div>

          {/* Avg Response */}
          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  Avg Response
                </h3>
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Zap className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {stats.avgResponseTime}ms
              </div>
              <div className="text-sm text-gray-500">Average response time</div>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Status Overview</h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-colors">
                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/30" />
                <span className="text-gray-300 font-medium">
                  {stats.online} Online
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-colors">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/30" />
                <span className="text-gray-300 font-medium">
                  {stats.offline} Offline
                </span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-colors">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30" />
                <span className="text-gray-300 font-medium">
                  {stats.unknown} Unknown
                </span>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-300 font-medium">System Health</span>
                <span className="text-blue-400 font-bold text-xl">
                  {stats.health}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${stats.health}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Your Monitors */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Globe className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Your Monitors</h2>
              <span className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-2 rounded-xl text-sm font-semibold border border-slate-600 shadow-lg">
                {monitors.length}
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2">
              {["All", "Online", "Offline", "Unknown"].map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Monitor Cards Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMonitors.map((monitor: Monitor) => (
                <div
                  key={monitor.id}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 shadow-lg hover:shadow-xl ${
                    monitor.status === "UP"
                      ? "bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/10"
                      : monitor.status === "DOWN"
                        ? "bg-gradient-to-br from-red-900/20 to-pink-900/20 border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/10"
                        : "bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30 hover:border-yellow-500/50 hover:shadow-yellow-500/10"
                  }`}
                >
                  {/* Status and Menu */}
                  <div className="flex justify-between items-start mb-4 relative">
                    <div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold shadow-lg ${getStatusColor(monitor.status)} text-white`}
                    >
                      {getStatusIcon(monitor.status)}
                      <span>{monitor.status}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => toggleDropdown(monitor.id)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {dropdownOpen === monitor.id && (
                        <div className="absolute right-0 mt-2 w-36 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-10 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleEditMonitor(monitor)}
                            className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-slate-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMonitor(monitor.id)}
                            className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-slate-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Monitor Name */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {monitor.name}
                  </h3>

                  {/* URL */}
                  <div className="flex items-center space-x-2 mb-4 p-3 bg-slate-700/30 rounded-xl">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <a
                      href={monitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-300 hover:text-blue-400 transition-colors truncate flex-1"
                    >
                      {monitor.url}
                    </a>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-slate-700/20 rounded-lg">
                      <span className="text-gray-400 flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>Check Interval</span>
                      </span>
                      <span className="text-white font-medium">
                        {monitor.check_interval_minutes}
                        {" minutes"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-700/20 rounded-lg">
                      <span className="text-gray-400 flex items-center space-x-2">
                        <Activity className="w-3 h-3" />
                        <span>Last Check</span>
                      </span>
                      <span className="text-white font-medium">
                        {monitor.last_checked_at
                          ? dayjs(monitor.last_checked_at).fromNow()
                          : "Never"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-slate-700/20 rounded-lg">
                      <span className="text-gray-400 flex items-center space-x-2">
                        <Calendar className="w-3 h-3" />
                        <span>Created</span>
                      </span>
                      <span className="text-white font-medium">
                        {dayjs(monitor.created_at).fromNow()}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-700/50 mt-4 pt-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">
                        Checked{" "}
                        {monitor.last_checked_at
                          ? dayjs(monitor.last_checked_at).fromNow()
                          : "never"}
                      </span>
                      {monitor.response_time && (
                        <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
                          <Zap className="w-3 h-3 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">
                            {monitor.response_time}ms
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
            >
              <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                <Plus className="w-6 h-6 text-blue-400 group-hover:rotate-90 transition-transform duration-300" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-lg">Add Monitor</p>
                <p className="text-sm text-gray-400">Monitor a new service</p>
              </div>
            </button>

            <button
              type="button"
              onClick={handleDeleteAllMonitors}
              className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/10"
              disabled={monitors.length === 0 || loading}
            >
              <div className="p-3 bg-red-500/20 rounded-xl group-hover:bg-red-500/30 transition-colors">
                <Trash2 className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-lg">
                  Delete All Monitors
                </p>
                <p className="text-sm text-gray-400">Remove all monitors</p>
              </div>
            </button>

            <button
              type="button"
              onClick={fetchMonitors}
              className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/10"
            >
              <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                <RefreshCw className="w-6 h-6 text-green-400 group-hover:rotate-180 transition-transform duration-300" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-lg">Refresh Data</p>
                <p className="text-sm text-gray-400">Update monitor status</p>
              </div>
            </button>

            <button
              onClick={() => router.push("/incidents")}
              type="button"
              className="group flex items-center space-x-4 p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl hover:border-yellow-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-yellow-500/10"
            >
              <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:bg-yellow-500/30 transition-colors">
                <AlertTriangle className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-lg">View Incidents</p>
                <p className="text-sm text-gray-400">Check incident history</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <AddMonitorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSave}
      />
      <AddMonitorModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedMonitor(null);
        }}
        onSave={handleSaveEdit}
        initialData={selectedMonitor}
        isEditMode={true}
      />
    </div>
  );
}
