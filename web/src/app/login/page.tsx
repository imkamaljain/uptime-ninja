"use client";

import axios from "axios";
import { Activity, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData,
      );

      router.push("/monitors");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Main Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh)] px-6">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <Link
                href="/"
                className="flex justify-center items-center space-x-3 mb-6"
              >
                <Activity className="w-8 h-8 text-blue-400" />
                <h1 className="text-2xl font-bold">Uptime Ninja</h1>
              </Link>

              <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
              <p className="text-slate-400">
                Sign in to your account to continue monitoring
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-slate-400"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pr-12 bg-slate-800/60 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white placeholder-slate-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
              >
                Sign In
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-slate-400">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  type="button"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Additional Options */}
          <div className="text-center mt-6">
            <button
              type="button"
              className="text-slate-400 hover:text-slate-300 text-sm transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
