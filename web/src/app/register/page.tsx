"use client";

import { themeClasses } from "@/theme";
import axios from "axios";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        formData,
      );
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div
      className={`${themeClasses.page} text-white overflow-hidden min-h-screen`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/8 via-purple-500/4 to-cyan-500/8" />

      {/* Grid Pattern Overlay with Animation */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Enhanced App Details with Slide In Animation */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-12 slide-in-left">
          <div className="max-w-lg space-y-8">
            {/* Logo and Brand with Float Animation */}
            <div className="mb-6 fade-in-up delay-100">
              <Link
                href="/"
                className="group/logo flex items-center space-x-4 hover:scale-105 transition-all duration-300 float"
              >
                <div className="relative p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-2xl shadow-blue-500/25 group-hover/logo:shadow-blue-500/40 transition-all duration-300 glow">
                  <Activity className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 shimmer" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Uptime Ninja
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Monitor • Alert • Analyze
                  </p>
                </div>
              </Link>
            </div>

            {/* Main Headline with Fade In Up Animation */}
            <div className="space-y-4 fade-in-up delay-200">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
                Never miss
                <br />
                downtime again
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                Real-time monitoring with instant alerts across multiple
                channels. Stay ahead of issues before they impact your users.
              </p>
            </div>

            {/* Compact Features Grid with Staggered Animation */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm border border-slate-600/20 rounded-xl hover:border-blue-500/30 transition-all duration-300 group fade-in-up delay-300">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-300 pulse">
                  <Zap className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm text-gray-300">
                  Global monitoring network
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm border border-slate-600/20 rounded-xl hover:border-purple-500/30 transition-all duration-300 group fade-in-up delay-400">
                <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300 pulse">
                  <Shield className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm text-gray-300">
                  Multi-channel alerts
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-slate-800/30 to-slate-700/30 backdrop-blur-sm border border-slate-600/20 rounded-xl hover:border-green-500/30 transition-all duration-300 group fade-in-up delay-500">
                <div className="p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/20 group-hover:border-green-400/40 transition-all duration-300 pulse">
                  <BarChart3 className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm text-gray-300">
                  Advanced analytics
                </span>
              </div>
            </div>

            {/* Compact Stats with Hover Animations */}
            <div className="grid grid-cols-3 gap-3 fade-in-up delay-600">
              <div className="text-center p-3 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-blue-500/20 transition-all duration-300 hover:scale-105 float delay-100">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  99.9%
                </div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-purple-500/20 transition-all duration-300 hover:scale-105 float delay-200">
                <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  24/7
                </div>
                <div className="text-xs text-gray-400">Monitor</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-xl hover:border-green-500/20 transition-all duration-300 hover:scale-105 float delay-300">
                <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  10K+
                </div>
                <div className="text-xs text-gray-400">Sites</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Streamlined Form with Slide In Animation */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-12 slide-in-right">
          <div className="w-full max-w-md">
            {/* Register Card with Enhanced Animations */}
            <div className="group relative overflow-hidden rounded-2xl fade-in-up delay-100">
              {/* Animated border with shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40 rounded-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 blur-sm pulse" />
              <div className="absolute inset-[4px] bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl" />
              {/* Subtle glow effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-cyan-500/3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent group-hover:via-blue-400/60 transition-all duration-500 shimmer" />

              <div className="relative z-10 p-8">
                {/* Compact Title with Animation */}
                <div className="text-center mb-8 fade-in-up delay-200">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                    Join Uptime Ninja
                  </h2>
                  <p className="text-gray-400">Start monitoring in seconds</p>
                </div>

                {/* Streamlined Form with Staggered Animations */}
                <div className="space-y-5">
                  {/* Name Field */}
                  <div className="group/field relative fade-in-up delay-300">
                    <div className="relative flex items-center">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/field:text-blue-400 transition-colors z-10 group-focus-within/field:scale-110" />
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-900/60 backdrop-blur-sm border border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 focus:bg-slate-900/80 transition-all duration-300 text-white placeholder-slate-400 hover:border-slate-500/40 hover:scale-[1.01]"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group/field relative fade-in-up delay-400">
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/field:text-blue-400 transition-colors z-10 group-focus-within/field:scale-110" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3.5 bg-slate-900/60 backdrop-blur-sm border border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 focus:bg-slate-900/80 transition-all duration-300 text-white placeholder-slate-400 hover:border-slate-500/40 hover:scale-[1.01]"
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="group/field relative fade-in-up delay-500">
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/field:text-blue-400 transition-colors z-10 group-focus-within/field:scale-110" />
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3.5 bg-slate-900/60 backdrop-blur-sm border border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 focus:bg-slate-900/80 transition-all duration-300 text-white placeholder-slate-400 hover:border-slate-500/40 hover:scale-[1.01]"
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-all duration-300 z-10 hover:scale-110"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {/* Animated Password Strength */}
                    {formData.password && (
                      <div className="mt-2 flex space-x-1 fade-in-up">
                        <div
                          className={`h-1 flex-1 rounded-full transition-all duration-500 ${formData.password.length >= 1 ? "bg-red-400/60 shimmer" : "bg-slate-700"}`}
                        />
                        <div
                          className={`h-1 flex-1 rounded-full transition-all duration-500 delay-100 ${formData.password.length >= 6 ? "bg-yellow-400/60 shimmer" : "bg-slate-700"}`}
                        />
                        <div
                          className={`h-1 flex-1 rounded-full transition-all duration-500 delay-200 ${formData.password.length >= 8 ? "bg-green-400/60 shimmer" : "bg-slate-700"}`}
                        />
                      </div>
                    )}
                  </div>

                  {/* Compact Terms with Animation */}
                  <div className="flex items-center space-x-3 fade-in-up delay-600">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-800/60 text-blue-500 focus:ring-blue-500/40 focus:ring-2 transition-all duration-300 hover:scale-110"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400">
                      I accept the{" "}
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-300 transition-colors underline hover:scale-105 inline-block"
                      >
                        terms
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-blue-400 hover:text-blue-300 transition-colors underline hover:scale-105 inline-block"
                      >
                        privacy policy
                      </button>
                    </label>
                  </div>

                  {/* Create Account Button with Enhanced Animations */}
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!acceptedTerms}
                    className="group relative w-full py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-500 hover:via-purple-500 hover:to-cyan-500 text-white rounded-2xl font-semibold transition-all duration-300 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] flex items-center justify-center space-x-2 fade-in-up delay-500 hover:glow"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl shimmer" />
                  </button>

                  {/* Sign In Link with Animation */}
                  <div className="text-center pt-4 border-t border-slate-700/50 fade-in-up delay-800">
                    <p className="text-gray-400 text-sm mb-3">
                      Already have an account?
                    </p>
                    <Link
                      href="/login"
                      className="inline-flex items-center space-x-2 px-4 py-2 text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 hover:scale-105 float"
                    >
                      <span>Sign in</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
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
