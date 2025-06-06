"use client";

import { themeClasses } from "@/theme";
import axios from "axios";
import {
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Sparkles,
  User,
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
    <div className={`${themeClasses.page} text-white overflow-hidden`}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-cyan-500/10 blur-3xl opacity-30" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      {/* Main Register Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          {/* Register Card */}
          <div className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              {/* Logo and Title */}
              <div className="text-center mb-10">
                <Link
                  href="/"
                  className="group/logo flex justify-center items-center space-x-3 mb-8 hover:scale-105 transition-transform duration-300"
                >
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-2xl shadow-purple-500/25 group-hover/logo:shadow-purple-500/40 transition-shadow duration-300">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Uptime Ninja
                  </h1>
                </Link>

                <div className="mb-6">
                  <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Create your account
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Start monitoring your websites and services
                  </p>
                </div>

                {/* Free Account Badge */}
                <div className="inline-flex items-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 px-4 py-2 rounded-xl shadow-lg">
                  <Sparkles className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-sm text-green-400 font-medium">
                    Free forever • No credit card required
                  </span>
                </div>
              </div>

              {/* Register Form */}
              <div className="space-y-6">
                {/* Full Name Field */}
                <div className="group/field">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-3 text-gray-300"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within/field:text-purple-400 transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-white placeholder-slate-400 hover:border-slate-500/50 shadow-lg"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group/field">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-3 text-gray-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within/field:text-purple-400 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-white placeholder-slate-400 hover:border-slate-500/50 shadow-lg"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="group/field">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold mb-3 text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within/field:text-purple-400 transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-14 py-4 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-white placeholder-slate-400 hover:border-slate-500/50 shadow-lg"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors p-1 rounded-lg hover:bg-slate-700/50"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  <div className="mt-2 flex space-x-1">
                    <div
                      className={`h-1 flex-1 rounded-full ${formData.password.length >= 1 ? "bg-red-500" : "bg-slate-700"}`}
                    />
                    <div
                      className={`h-1 flex-1 rounded-full ${formData.password.length >= 6 ? "bg-yellow-500" : "bg-slate-700"}`}
                    />
                    <div
                      className={`h-1 flex-1 rounded-full ${formData.password.length >= 8 ? "bg-green-500" : "bg-slate-700"}`}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-slate-600 bg-slate-800/60 text-purple-500 focus:ring-purple-500/50 focus:ring-2"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-400 leading-relaxed"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-purple-400 hover:text-purple-300 transition-colors hover:underline"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-purple-400 hover:text-purple-300 transition-colors hover:underline"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!acceptedTerms}
                  className="group w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-600 disabled:cursor-not-allowed text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:shadow-none disabled:scale-100 flex items-center justify-center space-x-2"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Security Notice */}
                <div className="flex items-center justify-center space-x-2 p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">
                    Your data is encrypted and secure
                  </span>
                </div>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-slate-400 bg-gradient-to-r from-slate-900 to-slate-800">
                      Already have an account?
                    </span>
                  </div>
                </div>

                {/* Sign In Link */}
                <div className="text-center">
                  <Link
                    href="/login"
                    className="group inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-slate-700/50 to-slate-600/50 hover:from-slate-600/50 hover:to-slate-500/50 border border-slate-600/50 hover:border-slate-500/50 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <span>Sign in instead</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features Preview */}
          {/* <div className="mt-8">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400">
                What you'll get with your free account
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="group p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-green-500/50 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="text-green-400 mb-2">
                    <Activity className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    5 Monitors
                  </p>
                </div>
              </div>
              <div className="group p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-blue-500/50 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="text-blue-400 mb-2">
                    <div className="w-5 h-5 bg-blue-400 rounded-full animate-pulse" />
                  </div>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    5min Checks
                  </p>
                </div>
              </div>
              <div className="group p-4 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-purple-500/50 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="text-purple-400 mb-2">
                    <Mail className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                    Email Alerts
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
