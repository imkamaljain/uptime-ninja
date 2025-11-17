"use client";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle,
  Clock,
  Globe,
  Globe2,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import theme, { themeClasses } from "../theme";

export default function Home() {
  const stats: Record<any, any>[] = [
    {
      key: "websites-monitored",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      iconBg: "bg-blue-500/20",
      gradientFrom: "from-blue-500/5",
      gradientTo: "to-purple-500/5",
      borderHover: "hover:border-slate-600",
      value: "50,000+",
      valueStyle:
        "bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent",
      label: "Websites Monitored",
    },
    {
      key: "uptime-accuracy",
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      iconBg: "bg-green-500/20",
      gradientFrom: "from-green-500/5",
      gradientTo: "to-emerald-500/5",
      borderHover: "hover:border-green-500/50",
      shadowHover: "hover:shadow-green-500/10",
      value: "99.9%",
      valueStyle: "text-green-400",
      label: "Uptime Accuracy",
    },
    {
      key: "response-time",
      icon: <Clock className="w-6 h-6 text-yellow-400" />,
      iconBg: "bg-yellow-500/20",
      gradientFrom: "from-yellow-500/5",
      gradientTo: "to-orange-500/5",
      borderHover: "hover:border-yellow-500/50",
      shadowHover: "hover:shadow-yellow-500/10",
      value: "<1s",
      valueStyle: "text-yellow-400",
      label: "Response Time",
    },
    {
      key: "global-locations",
      icon: <Globe2 className="w-6 h-6 text-purple-400" />,
      iconBg: "bg-purple-500/20",
      gradientFrom: "from-purple-500/5",
      gradientTo: "to-pink-500/5",
      borderHover: "hover:border-purple-500/50",
      shadowHover: "hover:shadow-purple-500/10",
      value: "15+",
      valueStyle: "text-purple-400",
      label: "Global Locations",
    },
  ];

  const features: Record<any, any>[] = [
    {
      key: "real-time-monitoring",
      title: "Real-time Monitoring",
      description:
        "Monitor your websites every minute with instant notifications when issues arise.",
      icon: <Activity className="w-8 h-8 text-blue-400" />,
      borderColor: "blue-500",
      gradientFrom: "blue-500/5",
      gradientTo: "cyan-500/5",
      iconBgFrom: "from-blue-500/20",
      iconBgTo: "to-cyan-500/20",
      iconBorder: "border-blue-500/30",
      shadowColor: "blue-500/10",
    },
    {
      key: "detailed-analytics",
      title: "Detailed Analytics",
      description:
        "Get insights into your website performance with uptime statistics and response times.",
      icon: <BarChart3 className="w-8 h-8 text-green-400" />,
      borderColor: "green-500",
      gradientFrom: "green-500/5",
      gradientTo: "emerald-500/5",
      iconBgFrom: "from-green-500/20",
      iconBgTo: "to-emerald-500/20",
      iconBorder: "border-green-500/30",
      shadowColor: "green-500/10",
    },
    {
      key: "instant-alerts",
      title: "Instant Alerts",
      description:
        "Receive immediate notifications via email when your websites go down or recover.",
      icon: <Bell className="w-8 h-8 text-yellow-400" />,
      borderColor: "yellow-500",
      gradientFrom: "yellow-500/5",
      gradientTo: "orange-500/5",
      iconBgFrom: "from-yellow-500/20",
      iconBgTo: "to-orange-500/20",
      iconBorder: "border-yellow-500/30",
      shadowColor: "yellow-500/10",
    },
    {
      key: "easy-setup",
      title: "Easy Setup",
      description:
        "Add your websites in seconds. No complex configuration or technical knowledge required.",
      icon: <CheckCircle className="w-8 h-8 text-purple-400" />,
      borderColor: "purple-500",
      gradientFrom: "purple-500/5",
      gradientTo: "pink-500/5",
      iconBgFrom: "from-purple-500/20",
      iconBgTo: "to-pink-500/20",
      iconBorder: "border-purple-500/30",
      shadowColor: "purple-500/10",
    },
    {
      key: "incident-tracking",
      title: "Incident Tracking",
      description:
        "Keep track of all downtime events with detailed incident logs and recovery times.",
      icon: <Shield className="w-8 h-8 text-red-400" />,
      borderColor: "red-500",
      gradientFrom: "red-500/5",
      gradientTo: "orange-500/5",
      iconBgFrom: "from-red-500/20",
      iconBgTo: "to-orange-500/20",
      iconBorder: "border-red-500/30",
      shadowColor: "red-500/10",
    },
    {
      key: "status-dashboard",
      title: "Status Dashboard",
      description:
        "Beautiful, intuitive dashboard to monitor all your services at a glance.",
      icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
      borderColor: "cyan-500",
      gradientFrom: "cyan-500/5",
      gradientTo: "blue-500/5",
      iconBgFrom: "from-cyan-500/20",
      iconBgTo: "to-blue-500/20",
      iconBorder: "border-cyan-500/30",
      shadowColor: "cyan-500/10",
    },
  ];

  return (
    <div className={themeClasses.page}>
      {/* Hero Section */}
      <section
        className={`${theme.layout.section} relative text-center py-24 px-6 overflow-hidden grid-pattern`}
      >
        {/* Animated Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 blur-3xl opacity-30 pulse" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl rotate" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl rotate"
          style={{ animationDirection: "reverse" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex justify-center items-center space-x-4 mb-8 fade-in-up">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl shadow-blue-500/25 float glow">
              <Activity className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Uptime Ninja
            </h1>
          </div>

          <div className="mb-12 fade-in-up delay-200">
            <div className="inline-flex items-center bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-slate-600/50 px-6 py-3 rounded-2xl shadow-xl shimmer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg pulse">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium text-lg">
                  Website Monitoring Made Simple
                </span>
              </div>
            </div>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight fade-in-up delay-300">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Monitor Your Websites
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent wave">
              24/7
            </span>
          </h2>

          <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed fade-in-up delay-400">
            Keep your websites and services running smoothly with real-time
            monitoring, instant alerts, and detailed uptime analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in-up delay-500">
            <Link
              href="/register"
              className="group flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 glow"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 border border-slate-600 text-white rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 shimmer"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm pulse" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className={`group relative text-center p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700 ${stat.borderHover} transition-all duration-300 shadow-lg hover:shadow-xl ${stat.shadowHover ?? ""} hover:scale-105 fade-in-up delay-${(index + 1) * 100}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradientFrom} ${stat.gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 ${stat.iconBg} rounded-xl float delay-${index * 100}`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`text-4xl font-bold mb-2 ${stat.valueStyle}`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-up">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl pulse">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-cyan-400 font-semibold text-lg">
                Premium Features
              </span>
            </div>
            <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose Uptime Ninja?
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple, powerful monitoring that just works for modern businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.key}
                className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-slate-700 hover:border-${feature.borderColor}/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-${feature.shadowColor} fade-in-up delay-${(index + 1) * 100}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${feature.gradientFrom} to-${feature.gradientTo} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div
                    className={`p-4 bg-gradient-to-r ${feature.iconBgFrom} ${feature.iconBgTo} rounded-2xl w-fit mb-6 border ${feature.iconBorder} float delay-${index * 100}`}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 pulse" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl rotate" />
        <div
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl rotate"
          style={{ animationDirection: "reverse" }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 fade-in-up">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl pulse">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-orange-400 font-semibold text-lg">
                Simple Process
              </span>
            </div>
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How Uptime Ninja Works?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Add Your URLs",
                desc: "Simply enter the websites, APIs, or services you want to monitor.",
                color: "from-blue-500 to-cyan-500",
                bgColor: "from-blue-500/10 to-cyan-500/10",
                borderColor: "border-blue-500/30",
              },
              {
                step: "2",
                title: "Configure Alerts",
                desc: "Choose how you want to be notified—email, SMS, or webhook.",
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-500/10 to-pink-500/10",
                borderColor: "border-purple-500/30",
              },
              {
                step: "3",
                title: "Monitor & Analyze",
                desc: "Track uptime, downtime, and performance in real time.",
                color: "from-green-500 to-emerald-500",
                bgColor: "from-green-500/10 to-emerald-500/10",
                borderColor: "border-green-500/30",
              },
            ].map(
              ({ step, title, desc, color, bgColor, borderColor }, index) => (
                <div
                  key={step}
                  className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 hover:${borderColor} rounded-2xl p-10 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl fade-in-up delay-${(index + 1) * 200}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${color} text-white rounded-2xl flex items-center justify-center text-2xl font-extrabold mb-8 mx-auto shadow-lg float delay-${index * 300} glow`}
                    >
                      {step}
                    </div>
                    <h3 className="text-2xl font-bold text-white text-center mb-4">
                      {title}
                    </h3>
                    <p className="text-gray-400 text-center leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-slate-900/30 pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl rotate" />

        <div className="max-w-5xl mx-auto relative z-10 fade-in-up">
          <div className="p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-3xl w-fit mx-auto mb-8 border border-slate-600/50 float glow">
            <Globe className="w-12 h-12 text-blue-400" />
          </div>
          <h3 className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent wave">
            Ready to Start Monitoring?
          </h3>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of developers and businesses who trust Uptime Ninja
            to keep their websites running smoothly.
          </p>
          <Link
            href="/register"
            className="group inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-2xl font-semibold text-xl transition-all duration-300 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 glow shimmer"
          >
            <span>Create Your Free Account</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 grid-pattern" />
        <div className="relative z-10 text-center fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl float">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Uptime Ninja
            </span>
          </div>
          <p className="text-gray-400">
            &copy; 2025 Uptime Ninja. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
