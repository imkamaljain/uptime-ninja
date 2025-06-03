"use client";

import AddMonitorModal from "@/components/AddMonitorModal";
import Header from "@/components/Header";
import dayjs from "@/lib/dayjs";
import { getAllMonitors } from "@/lib/monitor-api";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  MoreVertical,
  Plus,
  RefreshCw,
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
}
export default function Monitors() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [monitors, setMonitors] = useState([]);
  const [stats, setStats] = useState({
    online: 0,
    offline: 0,
    unknown: 0,
    health: 0,
    avgResponseTime: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchMonitors = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await getAllMonitors();
      const data = response.data;

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

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <Header activeTab="monitors" />

      {/* Main Content */}
      <div className="p-6">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Monitor Dashboard</h1>
            <p className="text-slate-400">
              Real-time monitoring of your websites and services
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={fetchMonitors}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {loading ? (
                <span className="animate-spin">
                  <RefreshCw className="w-4 h-4" />
                </span>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white text-slate-900 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Monitor</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Monitors */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Monitors</p>
                <p className="text-3xl font-bold">{monitors.length}</p>
                <p className="text-slate-400 text-sm">
                  Active monitoring services
                </p>
              </div>
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          {/* Online Services */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Online Services</p>
                <p className="text-3xl font-bold text-green-400">
                  {stats.online}
                </p>
                <p className="text-slate-400 text-sm">Running smoothly</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          </div>

          {/* System Uptime */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">System Uptime</p>
                <p className="text-3xl font-bold">{stats.health}%</p>
                <p className="text-slate-400 text-sm">Overall health score</p>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          {/* Avg Response */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Avg Response</p>
                <p className="text-3xl font-bold">{stats.avgResponseTime}ms</p>
                <p className="text-slate-400 text-sm">Average response time</p>
              </div>
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-5 h-5" />
            <h2 className="text-xl font-bold">Status Overview</h2>
          </div>

          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm">{stats.online} Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm">{stats.offline} Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-sm">{stats.unknown} Unknown</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">System Health</span>
              <span className="text-sm font-medium">{stats.health}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${stats.health}%` }}
              />
            </div>
          </div>
        </div>

        {/* Your Monitors */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <h2 className="text-xl font-bold">Your Monitors</h2>
              <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-sm">
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
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    activeFilter === filter
                      ? "bg-slate-700 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Monitor Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMonitors.map((monitor: any) => (
              <div
                key={monitor.id}
                className={`p-6 rounded-xl border transition-colors ${
                  monitor.status === "UP"
                    ? "bg-green-900/20 border-green-700"
                    : monitor.status === "DOWN"
                      ? "bg-red-900/20 border-red-700"
                      : "bg-yellow-900/20 border-yellow-700"
                }`}
              >
                {/* Status and Menu */}
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`flex items-center space-x-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(monitor.status)} text-white`}
                  >
                    {getStatusIcon(monitor.status)}
                    <span>{monitor.status}</span>
                  </div>
                  <button
                    type="button"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Monitor Name */}
                <h3 className="text-lg font-semibold mb-2">{monitor.name}</h3>

                {/* URL */}
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <a
                    href={monitor.url}
                    className="text-sm text-blue-300 hover:text-blue-400 transition-colors"
                  >
                    {monitor.url}
                  </a>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Interval</span>
                    </span>
                    <span>{monitor.interval || "5m"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>Last Check</span>
                    </span>
                    <span>{dayjs(monitor.last_checked_at).fromNow()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Created</span>
                    </span>
                    <span>{dayjs(monitor.created_at).fromNow()}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-700 mt-4 pt-3 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>
                      Checked {dayjs(monitor.last_checked_at).fromNow()}
                    </span>
                    {monitor.response_time && (
                      <span className="flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>{monitor.response_time}ms</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5" />
            <h2 className="text-xl font-bold">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              className="flex items-center space-x-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <Plus className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="font-medium">Add Monitor</p>
                <p className="text-sm text-slate-400">Monitor a new service</p>
              </div>
            </button>

            <button
              type="button"
              onClick={fetchMonitors}
              className="flex items-center space-x-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <p className="font-medium">Refresh Data</p>
                <p className="text-sm text-slate-400">Update monitor status</p>
              </div>
            </button>

            <button
              onClick={() => router.push("/incidents")}
              type="button"
              className="flex items-center space-x-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <div className="text-left">
                <p className="font-medium">View Incidents</p>
                <p className="text-sm text-slate-400">Check incident history</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <AddMonitorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(newMonitor) => {
          // Optional: call API to save, then refetch
          console.log("Save monitor:", newMonitor);
          fetchMonitors();
        }}
      />
    </div>
  );
}
