"use client";

import DeletePopup from "@/components/DeletePopup";
import Header from "@/components/Header";
import { deleteUser, getUser, updateUser } from "@/lib/user-api";
import { themeClasses } from "@/theme";
import {
  AlertTriangle,
  Bell,
  Edit2,
  Trash,
  Trash2,
  User,
  Webhook,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  name: string;
  email: string;
  email_opt_in: boolean;
  slack_webhook_url: string;
}

export default function MyProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    email_opt_in: false,
    slack_webhook_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSlack, setIsEditingSlack] = useState(false);
  const [slackUrl, setSlackUrl] = useState(user.slack_webhook_url || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDataPopupOpen, setIsDeleteDataPopupOpen] = useState(false);
  const [isDeleteAccountPopupOpen, setIsDeleteAccountPopupOpen] =
    useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      const userData = await getUser();
      setUser(userData);
      setSlackUrl(userData.slack_webhook_url || "");
      setIsLoading(false);
    };
    loadUserProfile();
  }, []);

  const handleUpdateProfile = useCallback(async () => {
    setIsLoading(true);
    await updateUser({
      name: user.name,
      email: user.email,
    });
    toast.success("Profile details updated successfully!");
    setIsLoading(false);
    setIsEditing(false);
  }, [user.name, user.email]);

  const handleUpdateEmailNotifications = useCallback(async () => {
    setIsLoading(true);
    await updateUser({
      email_opt_in: user.email_opt_in,
    });
    toast.success("Email notification preference updated successfully!");
    setIsLoading(false);
  }, [user.email_opt_in]);

  const handleUpdateSlackWebhook = useCallback(async () => {
    if (
      !slackUrl ||
      !/^https:\/\/hooks\.slack\.com\/services\//.test(slackUrl)
    ) {
      toast.error("Please enter a valid Slack webhook URL");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    await updateUser({
      slack_webhook_url: slackUrl,
    });
    setUser((prev) => ({ ...prev, slack_webhook_url: slackUrl }));
    toast.success("Slack webhook saved successfully!");
    setIsEditingSlack(false);
    setIsLoading(false);
  }, [slackUrl]);

  const handleRemoveSlackWebhook = useCallback(async () => {
    setIsLoading(true);
    await updateUser({
      slack_webhook_url: "",
    });
    setUser((prev) => ({ ...prev, slack_webhook_url: "" }));
    toast.success("Slack webhook removed successfully!");
    setSlackUrl("");
    setIsEditingSlack(false);
    setIsLoading(false);
  }, []);

  const handleDeleteAllData = useCallback(async () => {
    setIsLoading(true);
    // await deleteUser();
    setIsDeleteDataPopupOpen(false);
    setIsLoading(false);
  }, []);

  const handleDeleteAccount = useCallback(async () => {
    setIsLoading(true);
    await deleteUser();
    toast.success("Account deleted successfully!");
    setIsDeleteAccountPopupOpen(false);
    setIsLoading(false);
    router.push("/login");
  }, [router]);

  return (
    <div className={themeClasses.page}>
      {/* Header */}
      <Header activeTab="profile" />

      <div className="p-6 space-y-8">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Manage your personal information and integrations
            </p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900licide p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              Personal Information
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  disabled={isLoading}
                />
              ) : (
                <div className="text-white text-lg">{user.name}</div>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  disabled={isLoading}
                />
              ) : (
                <div className="text-white text-lg">{user.email}</div>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 rounded-xl text-white font-medium border border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateProfile}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-medium border border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-spin">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-medium border border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Bell className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                Receive Email Notifications
              </div>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="email_opt_in"
                    value="yes"
                    checked={user.email_opt_in}
                    onChange={() =>
                      setUser((prev) => ({ ...prev, email_opt_in: true }))
                    }
                    className="text-blue-500 focus:ring-blue-500/20 bg-slate-700 border-slate-600 rounded-full"
                    disabled={isLoading}
                  />
                  <span className="text-gray-300">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="email_opt_in"
                    value="no"
                    checked={!user.email_opt_in}
                    onChange={() =>
                      setUser((prev) => ({
                        ...prev,
                        email_opt_in: false,
                      }))
                    }
                    className="text-blue-500 focus:ring-blue-500/20 bg-slate-700 border-slate-600 rounded-full"
                    disabled={isLoading}
                  />
                  <span className="text-gray-300">No</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleUpdateEmailNotifications}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-medium border border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {"Save Preference"}
              </button>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Webhook className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Integrations</h3>
          </div>
          <div className="space-y-4">
            <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
              Slack Webhook URL
            </div>
            {user?.slack_webhook_url && !isEditingSlack ? (
              <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg shadow-green-500/30" />
                  <span className="text-gray-300 font-medium truncate">
                    {user.slack_webhook_url}
                  </span>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditingSlack(true);
                      setSlackUrl(user.slack_webhook_url || "");
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl text-white font-medium border border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveSlackWebhook}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white font-medium border border-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="url"
                    value={slackUrl}
                    onChange={(e) => setSlackUrl(e.target.value)}
                    placeholder="https://hooks.slack.com/services/..."
                    className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-2 text-sm text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={handleUpdateSlackWebhook}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-medium border border-green-600 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {user?.slack_webhook_url ? "Save Webhook" : "Add Webhook"}
                  </button>
                  {isEditingSlack && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingSlack(false);
                        setSlackUrl(user?.slack_webhook_url || "");
                      }}
                      className="px-6 py-2 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 rounded-xl text-white font-medium border border-slate-600 shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-red-700/50 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Danger Zone</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border border-red-500/20">
              <div className="flex-1">
                <h4 className="text-white font-medium">Delete All Data</h4>
                <p className="text-gray-400 text-sm">
                  Permanently delete all monitors and incidents associated with
                  your account.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteDataPopupOpen(true)}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white font-medium border border-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4 inline-block mr-2" />
                Delete All Data
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl border border-red-500/20">
              <div className="flex-1">
                <h4 className="text-white font-medium">Delete Account</h4>
                <p className="text-gray-400 text-sm">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDeleteAccountPopupOpen(true)}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl text-white font-medium border border-red-600 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4 inline-block mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>

        {/* Delete Data Confirmation Popup */}
        <DeletePopup
          isOpen={isDeleteDataPopupOpen}
          onClose={() => setIsDeleteDataPopupOpen(false)}
          onConfirm={handleDeleteAllData}
          message="Are you sure you want to delete all monitors and incidents? This action cannot be undone."
          isLoading={isLoading}
        />

        {/* Delete Account Confirmation Popup */}
        <DeletePopup
          isOpen={isDeleteAccountPopupOpen}
          onClose={() => setIsDeleteAccountPopupOpen(false)}
          onConfirm={handleDeleteAccount}
          message="Are you sure you want to delete your account? This action cannot be undone."
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
