"use client";

import Header from "@/components/Header";
import dayjs, { formatIncindentTime } from "@/lib/dayjs";
import { getAllIncidents } from "@/lib/incident-api";
import { themeClasses } from "@/theme";
import { Dayjs } from "dayjs";
import {
  Activity,
  AlertTriangle,
  Clock,
  RefreshCw,
  Shield,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Monitor {
  id: number;
  name: string;
  url: string;
}
type IncidentStatus = "OPEN" | "RESOLVED";
interface Incident {
  id: number;
  title: string;
  description: string;
  status: IncidentStatus;
  created_at: string;
  resolved_at: string | null;
  monitor: Monitor;
}

export default function IncidentsDashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
  const [timeFilter, setTimeFilter] = useState<string>("All time");
  const [statusFilter, setStatusFilter] = useState<string>("All events");
  const timeFilterOptions = [
    "All time",
    "This week",
    "Last week",
    "Last month",
    "This year",
  ];
  const statusFilterOptions = ["All events", "Open", "Resolved"];

  const formatDisplayDate = (date: string) => {
    const now = dayjs();
    const incidentDate = dayjs(date);
    const diffDays = now.diff(incidentDate, "day");

    if (incidentDate.isSame(now, "day")) {
      return "Today";
    }
    if (incidentDate.isSame(now.subtract(1, "day"), "day")) {
      return "Yesterday";
    }
    const isPreviousMonth =
      incidentDate.month() !== now.month() &&
      incidentDate.isSame(now.subtract(1, "month"), "month");
    if (isPreviousMonth) {
      return "Last Month";
    }
    if (diffDays <= 6) {
      return `${diffDays} days ago`;
    }
    if (diffDays <= 7) {
      return "Last Week";
    }
    return incidentDate.format("MMMM, YYYY");
  };

  const getGroupKey = (date: string) => {
    const displayDate = formatDisplayDate(date);
    if (displayDate.includes(", ")) {
      return displayDate;
    }
    const now = dayjs();
    const incidentDate = dayjs(date);
    const diffDays = now.diff(incidentDate, "day");

    if (incidentDate.isSame(now, "day")) {
      return `0_${displayDate}`;
    }
    if (incidentDate.isSame(now.subtract(1, "day"), "day")) {
      return `1_${displayDate}`;
    }
    const isPreviousMonth =
      incidentDate.month() !== now.month() &&
      incidentDate.isSame(now.subtract(1, "month"), "month");
    if (isPreviousMonth) {
      return `8_${displayDate}`;
    }
    if (diffDays <= 6) {
      return `${diffDays}_${displayDate}`;
    }
    if (diffDays <= 7) {
      return `${diffDays}_${displayDate}`;
    }
    return `9_${displayDate}`;
  };

  const filterIncidents = useCallback(
    (incidents: Incident[], time: string, status: string) => {
      let filtered = [...incidents];
      if (status && status !== "All events") {
        filtered = filtered.filter(
          (incident) => incident.status === status.toUpperCase(),
        );
      }
      if (time && time !== "All time") {
        const now: Dayjs = dayjs();
        filtered = filtered.filter((incident) => {
          const incidentDate: Dayjs = dayjs(incident.created_at);
          switch (time) {
            case "This week": {
              const start = now.subtract(7, "day");
              return incidentDate.isAfter(start) && incidentDate.isBefore(now);
            }
            case "Last week": {
              const start = now.subtract(14, "day");
              const end = now.subtract(7, "day");
              return incidentDate.isAfter(start) && incidentDate.isBefore(end);
            }
            case "Last month": {
              const lastMonth = now.subtract(1, "month");
              return incidentDate.month() === lastMonth.month();
            }
            case "This year":
              return incidentDate.year() === now.year();
            default:
              return true;
          }
        });
      }
      return filtered;
    },
    [],
  );

  const fetchIncidents = useCallback(async () => {
    setLoading(true);
    try {
      const response: Incident[] = await getAllIncidents();
      const data = response || [];
      setIncidents(data);
      setFilteredIncidents(filterIncidents(data, timeFilter, statusFilter));
    } catch (error) {
      console.error("Error fetching incidents:", error);
      setIncidents([]);
      setFilteredIncidents([]);
    } finally {
      setLoading(false);
    }
  }, [timeFilter, statusFilter, filterIncidents]);

  useEffect(() => {
    setFilteredIncidents(filterIncidents(incidents, timeFilter, statusFilter));
  }, [timeFilter, statusFilter, incidents, filterIncidents]);

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 50000);
    return () => clearInterval(interval);
  }, [fetchIncidents]);

  // Calculate stats
  const totalIncidents = incidents.length;
  const serviceOutages = incidents.filter((i) => i.status === "OPEN").length;
  const recoveries = incidents.filter((i) => i.status === "RESOLVED").length;
  const avgResolution =
    incidents
      .filter((i) => i.resolved_at)
      .reduce((acc, curr) => {
        const start = dayjs(curr.created_at).valueOf();
        const end = dayjs(curr.resolved_at).valueOf();
        return acc + (end - start);
      }, 0) /
      (recoveries || 1) /
      60000 || 0;

  // Group incidents by display date
  const incidentsByDisplayDate = filteredIncidents.reduce(
    (acc, incident) => {
      const date = incident.created_at;
      const groupKey = getGroupKey(date);
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(incident);
      return acc;
    },
    {} as Record<string, Incident[]>,
  );

  const today = incidents.filter((i) => {
    const date = dayjs(i.created_at);
    return date.isSame(dayjs(), "day");
  }).length;
  const yesterday = incidents.filter((i) => {
    const date = dayjs(i.created_at);
    return date.isSame(dayjs().subtract(1, "day"), "day");
  }).length;
  const last7DaysCount = incidents.filter((i) => {
    const date = dayjs(i.created_at);
    return date.isAfter(dayjs().subtract(7, "day"));
  }).length;

  return (
    <div className={themeClasses.page}>
      {/* Header */}
      <Header activeTab="incidents" />

      <div className="p-6 space-y-8">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Incidents Dashboard
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Track and analyze downtime events across all your monitors
            </p>
          </div>
          <button
            type="button"
            onClick={fetchIncidents}
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  Total Incidents
                </h3>
                <div className="p-2 bg-gray-600/20 rounded-lg">
                  <Activity className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {totalIncidents}
              </div>
              <div className="text-sm text-gray-500">All recorded events</div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  Service Outages
                </h3>
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-red-400 mb-2">
                {serviceOutages}
              </div>
              <div className="text-sm text-gray-500">Services went down</div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  Recoveries
                </h3>
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">
                {recoveries}
              </div>
              <div className="text-sm text-gray-500">Services recovered</div>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  Avg Resolution
                </h3>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {Math.round(avgResolution)}m
              </div>
              <div className="text-sm text-gray-500">Average downtime</div>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Recent Activity
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-colors">
                <span className="text-gray-300 font-medium">Today</span>
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                  {today}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-colors">
                <span className="text-gray-300 font-medium">Yesterday</span>
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                  {yesterday}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl hover:bg-slate-700/70 transition-colors">
                <span className="text-gray-300 font-medium">Last 7 days</span>
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg">
                  {last7DaysCount}
                </span>
              </div>
            </div>
          </div>

          {/* Incident Types */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Incident Types
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg shadow-red-500/30" />
                  <span className="text-gray-300 font-medium">Outages</span>
                </div>
                <span className="text-white font-bold text-lg">
                  {serviceOutages}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/30" />
                  <span className="text-gray-300 font-medium">Recoveries</span>
                </div>
                <span className="text-white font-bold text-lg">
                  {recoveries}
                </span>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                  <span className="text-gray-300 font-medium">
                    Recovery Rate
                  </span>
                  <span className="text-blue-400 font-bold text-xl">
                    {totalIncidents
                      ? Math.round((recoveries / totalIncidents) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                System Health
              </h3>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl" />
                <div className="relative p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-500/30">
                  <Zap className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-yellow-400 font-bold text-lg">
                  Recent Activity
                </div>
                <div className="text-gray-400">
                  <span className="text-2xl font-bold text-white">
                    {last7DaysCount}
                  </span>{" "}
                  incidents this week
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Incident History */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Incident History
              </h3>
              <span className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-2 rounded-xl text-sm font-semibold border border-slate-600 shadow-lg">
                {filteredIncidents.length}
              </span>
            </div>
            <div className="flex space-x-4">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                {timeFilterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                {statusFilterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-6">
            {Object.keys(incidentsByDisplayDate).length > 0 ? (
              Object.entries(incidentsByDisplayDate)
                .sort((a, b) => {
                  // Sort by group key (numeric prefix ensures correct order)
                  return a[0].localeCompare(b[0]);
                })
                .map(([groupKey, dateIncidents]) => {
                  // Extract display date from groupKey (remove numeric prefix)
                  const displayDate = groupKey.includes("_")
                    ? groupKey.split("_")[1]
                    : groupKey;
                  return (
                    <div key={groupKey} className="mb-8">
                      <div className="flex items-center justify-between mb-6 p-4 bg-slate-700/30 rounded-xl border border-slate-700">
                        <h4 className="text-xl font-bold text-white">
                          {displayDate}
                        </h4>
                        <span className="text-sm text-gray-400 bg-slate-600/50 px-3 py-1 rounded-lg">
                          {dateIncidents.length} events
                        </span>
                      </div>

                      <div className="space-y-4">
                        {dateIncidents
                          .sort(
                            (a, b) =>
                              dayjs(b.created_at).valueOf() -
                              dayjs(a.created_at).valueOf(),
                          )
                          .map((incident) => (
                            <div
                              key={incident.id}
                              className={`group relative flex items-start space-x-4 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-2xl border-l-4 hover:from-slate-900/70 hover:to-slate-800/70 transition-all duration-300 shadow-lg hover:shadow-xl ${
                                incident.status === "OPEN"
                                  ? "border-red-500 hover:shadow-red-500/10"
                                  : "border-green-500 hover:shadow-green-500/10"
                              }`}
                            >
                              <div
                                className={`p-3 rounded-xl ${
                                  incident.status === "OPEN"
                                    ? "bg-red-500/20 border border-red-500/30"
                                    : "bg-green-500/20 border border-green-500/30"
                                }`}
                              >
                                {incident.status === "OPEN" ? (
                                  <TrendingDown className="w-5 h-5 text-red-400" />
                                ) : (
                                  <TrendingUp className="w-5 h-5 text-green-400" />
                                )}
                              </div>
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center space-x-4">
                                  <span className="font-bold text-white text-lg">
                                    {incident.monitor.name}
                                  </span>
                                  <span
                                    className={`${
                                      incident.status === "OPEN"
                                        ? "bg-gradient-to-b from-red-500 to-red-700 shadow-red-500/20"
                                        : "bg-gradient-to-b from-green-500 to-green-700 shadow-green-500/20"
                                    } text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg`}
                                  >
                                    {incident.status === "OPEN"
                                      ? "Service Down"
                                      : "Service Recovered"}
                                  </span>
                                </div>
                                <div className="text-gray-300 leading-relaxed text-red-300">
                                  {incident.description}
                                </div>
                              </div>
                              <div className="text-right text-sm text-gray-400 space-y-3 min-w-48">
                                <div className="flex items-center justify-end space-x-2 p-2 bg-slate-700/30 rounded-lg">
                                  <Clock className="w-4 h-4 text-blue-400" />
                                  <span>
                                    Started:{" "}
                                    {formatIncindentTime(incident.created_at)}
                                  </span>
                                </div>
                                {incident.resolved_at && (
                                  <div className="flex items-center justify-end space-x-2 p-2 bg-slate-700/30 rounded-lg">
                                    <Clock className="w-4 h-4 text-green-400" />
                                    <span>
                                      Resolved:{" "}
                                      {formatIncindentTime(
                                        incident.resolved_at,
                                      )}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="p-6 text-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-lg">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
                    <AlertTriangle className="w-12 h-12 text-blue-400" />
                  </div>
                  <p className="text-gray-400 text-lg max-w-md">
                    No incidents match the selected filters. Try adjusting the
                    filters or check back later.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
