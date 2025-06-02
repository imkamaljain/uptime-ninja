import {
  Activity,
  BarChart3,
  Bell,
  CheckCircle,
  Globe,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="flex justify-center items-center space-x-3 mb-6">
          <Activity className="w-12 h-12 text-blue-400" />
          <h1 className="text-4xl font-bold">Uptime Ninja</h1>
        </div>

        <div className="mb-8">
          <span className="flex items-center justify-center">
            <span className="flex items-center bg-slate-600 text-white/80 px-3 py-1 rounded-full space-x-2">
              <Zap className="w-4 h-4" />
              <span>Website Monitoring Made Simple</span>
            </span>
          </span>
        </div>

        <h2 className="text-5xl md:text-6xl font-bold mb-5 leading-tight">
          Monitor Your Websites
          <br />
          <span className="text-blue-400">24/7</span>
        </h2>

        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Keep your websites and services running smoothly with real-time
          monitoring, instant alerts, and detailed uptime analytics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/register"
            className="px-8 py-3 bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
          >
            Get Started Free
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition-colors font-semibold text-lg"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 bg-slate-800/50 border-t border-b border-slate-700">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">50,000+</div>
            <div className="text-slate-400">Websites Monitored</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">99.9%</div>
            <div className="text-slate-400">Uptime Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">&lt;1s</div>
            <div className="text-slate-400">Response Time</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-slate-400">Global Locations</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">
              Why Choose Uptime Ninja?
            </h3>
            <p className="text-xl text-slate-400">
              Simple, powerful monitoring that just works
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Real-time Monitoring */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Real-time Monitoring</h4>
              <p className="text-slate-400 leading-relaxed">
                Monitor your websites every minute with instant notifications
                when issues arise.
              </p>
            </div>

            {/* Detailed Analytics */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Detailed Analytics</h4>
              <p className="text-slate-400 leading-relaxed">
                Get insights into your website performance with uptime
                statistics and response times.
              </p>
            </div>

            {/* Instant Alerts */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-6">
                <Bell className="w-6 h-6 text-yellow-400" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Instant Alerts</h4>
              <p className="text-slate-400 leading-relaxed">
                Receive immediate notifications via email when your websites go
                down or recover.
              </p>
            </div>

            {/* Easy Setup */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Easy Setup</h4>
              <p className="text-slate-400 leading-relaxed">
                Add your websites in seconds. No complex configuration or
                technical knowledge required.
              </p>
            </div>

            {/* Incident Tracking */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Incident Tracking</h4>
              <p className="text-slate-400 leading-relaxed">
                Keep track of all downtime events with detailed incident logs
                and recovery times.
              </p>
            </div>

            {/* Status Dashboard */}
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="text-2xl font-bold mb-4">Status Dashboard</h4>
              <p className="text-slate-400 leading-relaxed">
                Beautiful, intuitive dashboard to monitor all your services at a
                glance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-24 bg-slate-800/50 border-t border-b border-slate-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 blur-2xl opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
              How Uptime Ninja Works?
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Get started in minutes with our simple 3-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Add Your URLs",
                desc: "Simply enter the websites, APIs, or services you want to monitor.",
              },
              {
                step: "2",
                title: "Configure Alerts",
                desc: "Choose how you want to be notified—email, SMS, or webhook.",
              },
              {
                step: "3",
                title: "Monitor & Analyze",
                desc: "Track uptime, downtime, and performance in real time.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="relative group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-md transition-transform hover:scale-105 hover:shadow-neon"
              >
                <div className="w-14 h-14 bg-blue-600/30 text-white rounded-full flex items-center justify-center text-2xl font-extrabold mb-6 mx-auto">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-3">
                  {title}
                </h3>
                <p className="text-slate-400 text-center text-base leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-4xl font-bold mb-6">
            Ready to Start Monitoring?
          </h3>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Join thousands of developers and businesses who trust Uptime Ninja
            to keep their websites running smoothly.
          </p>
          <Link
            href="/register"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            Create Your Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-slate-400">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Activity className="w-5 h-5 text-blue-400" />
          <span className="font-semibold">Uptime Ninja</span>
        </div>
        <p>&copy; 2025 Uptime Ninja. All rights reserved.</p>
      </footer>
    </div>
  );
}
