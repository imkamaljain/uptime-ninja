import { Sun, TrendingUp, User } from "lucide-react";

const Header = ({
  activeTab = "monitors",
  brandName = "Uptime Ninja",
  tabs = [
    { id: "monitors", label: "Monitors" },
    { id: "incidents", label: "Incidents" },
  ],
}) => {
  const handleTabClick = (tabId: string) => {
    window.location.href = `/${tabId}`;
  };
  const onThemeToggle = () => {
    document.documentElement.classList.toggle("light");
  };
  const onUserClick = () => {
    alert("User menu clicked");
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
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
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

        {/* User Controls */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => onThemeToggle()}
            className="p-2 hover:bg-gray-800 rounded transition-colors"
            title="Toggle theme"
          >
            <button type="button" className="text-xl cursor-pointer">
              <Sun className="w-6 h-6 text-yellow-500" />
            </button>
          </button>
          <button
            type="button"
            onClick={onUserClick}
            className="p-2 hover:bg-gray-800 rounded transition-colors cursor-pointer"
            title="User menu"
          >
            <span className="text-xl">
              <User className="w-6 h-6 text-blue-500" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
