"use client";

import Header from "@/components/Header";
import {
  AlertTriangle,
  Clock,
  RefreshCw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export default function IncidentsDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header activeTab="incidents" />

      <div className="p-6">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Incidents Dashboard</h1>
            <p className="text-gray-400">
              Track and analyze downtime events across all your monitors
            </p>
          </div>
          <button
            type="button"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Total Incidents</h3>
              <div className="w-2 h-2 bg-gray-500 rounded-full" />
            </div>
            <div className="text-3xl font-bold">8</div>
            <div className="text-sm text-gray-400">All recorded events</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Service Outages</h3>
              <TrendingDown className="w-4 h-4 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-500">5</div>
            <div className="text-sm text-gray-400">Services went down</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Recoveries</h3>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-500">3</div>
            <div className="text-sm text-gray-400">Services recovered</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Avg Resolution</h3>
              <Clock className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold">40m</div>
            <div className="text-sm text-gray-400">Average downtime</div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Activity */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Today</span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                  5
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Yesterday</span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                  2
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Last 7 days</span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                  8
                </span>
              </div>
            </div>
          </div>

          {/* Incident Types */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Incident Types</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-gray-300">Outages</span>
                </div>
                <span className="text-white">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-300">Recoveries</span>
                </div>
                <span className="text-white">3</span>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Recovery Rate</span>
                  <span className="text-white font-semibold">60%</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5" />
              <h3 className="text-lg font-semibold">System Health</h3>
            </div>
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mb-3" />
              <div className="text-center">
                <div className="text-yellow-500 font-semibold">
                  Recent Activity
                </div>
                <div className="text-sm text-gray-400">
                  8 incidents this week
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Incident History */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Incident History</h3>
              <span className="bg-gray-700 text-white px-2 py-1 rounded text-sm">
                8
              </span>
            </div>
            <div className="flex space-x-4">
              <select className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                <option>All time</option>
              </select>
              <select className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                <option>All events</option>
              </select>
            </div>
          </div>

          <div className="p-6">
            {/* Today */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Today</h4>
                <span className="text-sm text-gray-400">5 events</span>
              </div>

              <div className="space-y-4">
                {/* Blog Site Incident */}
                <div className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border-l-4 border-red-500">
                  <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold">Blog Site</span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        Service Down
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      HTTP 500 Internal Server Error
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ 5 minutes ago</span>
                      <span>17:28</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Changed from</div>
                    <div className="text-sm font-semibold">UP</div>
                  </div>
                </div>

                {/* API Server Recovery */}
                <div className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border-l-4 border-green-500">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold">API Server</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        Service Recovered
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      Service restored successfully
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ about 2 hours ago</span>
                      <span>15:33</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Changed from</div>
                    <div className="text-sm font-semibold">DOWN</div>
                  </div>
                </div>

                {/* API Server Down */}
                <div className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border-l-4 border-red-500">
                  <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold">API Server</span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        Service Down
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      Connection timeout after 30 seconds
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ about 3 hours ago</span>
                      <span>15:03</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Changed from</div>
                    <div className="text-sm font-semibold">UP</div>
                  </div>
                </div>

                {/* Main Website Recovery */}
                <div className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border-l-4 border-green-500">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold">Main Website</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        Service Recovered
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      Service recovered, response time normal
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ about 6 hours ago</span>
                      <span>11:33</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Changed from</div>
                    <div className="text-sm font-semibold">DOWN</div>
                  </div>
                </div>

                {/* Main Website Down */}
                <div className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border-l-4 border-red-500">
                  <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold">Main Website</span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        Service Down
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      DNS resolution failed
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ about 7 hours ago</span>
                      <span>11:03</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Changed from</div>
                    <div className="text-sm font-semibold">UP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Yesterday */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">Yesterday</h4>
                <span className="text-sm text-gray-400">2 events</span>
              </div>

              <div className="space-y-4">
                {/* E-commerce Store Recovery */}
                <div className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border-l-4 border-green-500">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold">E-commerce Store</span>
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        Service Recovered
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      SSL certificate renewed, service operational
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ 1 day ago</span>
                      <span>17:33</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Changed from</div>
                    <div className="text-sm font-semibold">DOWN</div>
                  </div>
                </div>

                {/* E-commerce Store Down */}
                <div className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border-l-4 border-red-500">
                  <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold">E-commerce Store</span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        Service Down
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      SSL certificate expired
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ 1 day ago</span>
                      <span>16:33</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Changed from</div>
                    <div className="text-sm font-semibold">UP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* May 28, 2025 */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">May 28, 2025</h4>
                <span className="text-sm text-gray-400">1 event</span>
              </div>

              <div className="space-y-4">
                {/* Admin Panel Down */}
                <div className="flex items-start space-x-4 p-4 bg-gray-900 rounded-lg border-l-4 border-red-500">
                  <TrendingDown className="w-5 h-5 text-red-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-semibold">Admin Panel</span>
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        Service Down
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">
                      Server maintenance window
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⏰ 2 days ago</span>
                      <span>17:33</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Changed from</div>
                    <div className="text-sm font-semibold">UP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
