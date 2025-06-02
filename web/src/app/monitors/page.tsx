"use client";

import Header from "@/components/Header";
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
import { useState } from "react";

export default function Monitors() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const monitors = [
    {
      id: 1,
      name: "Main Website",
      url: "https://example.com",
      status: "UP",
      responseTime: "245ms",
      interval: "5m",
      lastCheck: "2 minutes ago",
      created: "May 23",
      lastCheckTime: "2 minutes ago",
      responseValue: "245ms",
    },
    {
      id: 2,
      name: "API Server",
      url: "https://api.example.com",
      status: "UP",
      responseTime: "156ms",
      interval: "1m",
      lastCheck: "1 minute ago",
      created: "May 16",
      lastCheckTime: "1 minute ago",
      responseValue: "156ms",
    },
    {
      id: 3,
      name: "Blog Site",
      url: "https://blog.example.com",
      status: "DOWN",
      responseTime: null,
      interval: "10m",
      lastCheck: "5 minutes ago",
      created: "May 27",
      lastCheckTime: "5 minutes ago",
      responseValue: null,
    },
    {
      id: 4,
      name: "Admin Panel",
      url: "https://admin.example.com",
      status: "UNKNOWN",
      responseTime: null,
      interval: "15m",
      lastCheck: "20 minutes ago",
      created: "May 29",
      lastCheckTime: "20 minutes ago",
      responseValue: null,
    },
    {
      id: 5,
      name: "E-commerce Store",
      url: "https://store.example.com",
      status: "UP",
      responseTime: "389ms",
      interval: "5m",
      lastCheck: "3 minutes ago",
      created: "May 09",
      lastCheckTime: "3 minutes ago",
      responseValue: "389ms",
    },
  ];

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

  const filteredMonitors = monitors.filter((monitor) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Online") return monitor.status === "UP";
    if (activeFilter === "Offline") return monitor.status === "DOWN";
    if (activeFilter === "Unknown") return monitor.status === "UNKNOWN";
    return true;
  });

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
              className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 px-4 py-2 bg-white text-slate-900 hover:bg-gray-100 rounded-lg font-medium transition-colors cursor-pointer"
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
                <p className="text-3xl font-bold">5</p>
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
                <p className="text-3xl font-bold text-green-400">3</p>
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
                <p className="text-3xl font-bold">60.0%</p>
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
                <p className="text-3xl font-bold">158ms</p>
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
              <span className="text-sm">3 Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm">1 Offline</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-sm">1 Unknown</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">System Health</span>
              <span className="text-sm font-medium">60.0%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "60%" }}
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
                5
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
            {filteredMonitors.map((monitor) => (
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
                    {monitor.responseTime && (
                      <span>{monitor.responseTime}</span>
                    )}
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
                  <span className="text-sm text-slate-300">{monitor.url}</span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>Interval</span>
                    </span>
                    <span>{monitor.interval}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>Last Check</span>
                    </span>
                    <span>{monitor.lastCheck}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Created</span>
                    </span>
                    <span>{monitor.created}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-700 mt-4 pt-3 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Checked {monitor.lastCheckTime}</span>
                    {monitor.responseValue && (
                      <span className="flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>{monitor.responseValue}</span>
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
              className="flex items-center space-x-3 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
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
    </div>
  );
}
