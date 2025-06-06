import { LogOut, Settings, TrendingUp, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Header = ({
  activeTab = "monitors",
  brandName = "Uptime Ninja",
  tabs = [
    { id: "monitors", label: "Monitors" },
    { id: "incidents", label: "Incidents" },
  ],
}) => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabClick = (tabId: string) => {
    router.push(`/${tabId}`);
  };

  return (
    <header className="border-b border-gray-800 px-6 py-4 bg-gray-900 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-semibold text-white">
              {brandName}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4 relative">
          {/* Theme Toggle */}
          {/* <button
            type="button"
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-800 rounded transition-colors"
            title="Toggle theme"
          >
            {theme === "dark" ? (
            <Sun className="w-6 h-6 text-yellow-500" />
            ) : (
              <Moon className="w-6 h-6 text-yellow-500" />
            )}
          </button> */}

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 hover:bg-gray-800 rounded transition-colors"
              title="User menu"
            >
              <span className="text-xl">
                <User className="w-6 h-6 text-blue-500" />
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-gray-800 rounded-md shadow-lg py-2 z-50 text-md">
                <button
                  type="button"
                  onClick={() => router.push("/my-profile")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-gray-700"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  My Profile
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
