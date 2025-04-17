import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Palette,
  Lock,
  Bell,
  User,
  Check,
  Monitor,
  Save,
  Moon,
  Sun,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import type { ThemeColor } from "@/context/AppContext";

const SettingsView = () => {
  const { themeColor, setThemeColor, isDarkMode, setIsDarkMode } =
    useAppContext();
  const [notifications, setNotifications] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const themeColors: { name: ThemeColor; bg: string; label: string }[] = [
    { name: "blue", bg: "bg-blue-500", label: "Blue" },
    { name: "purple", bg: "bg-purple-500", label: "Purple" },
    { name: "green", bg: "bg-green-500", label: "Green" },
    { name: "orange", bg: "bg-orange-500", label: "Orange" },
    { name: "red", bg: "bg-red-500", label: "Red" },
  ];

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Current password is required",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      });
      return;
    }

    // Simulate password change success
    toast({
      title: "Success",
      description: "Your password has been updated",
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleThemeChange = (color: ThemeColor) => {
    setThemeColor(color);
    toast({
      title: "Theme Updated",
      description: `Theme color changed to ${color}`,
    });
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    toast({
      title: checked ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: "Theme preference saved",
    });
  };

  const handleNotificationsToggle = (checked: boolean) => {
    setNotifications(checked);
    toast({
      title: checked ? "Notifications Enabled" : "Notifications Disabled",
      description: "Your preferences have been saved",
    });
  };

  return (
    <div className="flex flex-col h-full px-4 md:px-8 overflow-y-auto pb-8">
      <div className="max-w-4xl mx-auto w-full py-8">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>

        <div className="space-y-8">
          {/* Appearance Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Palette size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Theme Color</h3>
                <div className="flex gap-3 flex-wrap">
                  {themeColors.map((color) => (
                    <button
                      key={color.name}
                      className={`w-10 h-10 rounded-full ${
                        color.bg
                      } flex items-center justify-center ${
                        themeColor === color.name
                          ? "ring-2 ring-offset-2 ring-primary"
                          : ""
                      }`}
                      onClick={() => handleThemeChange(color.name)}
                      aria-label={`Set theme color to ${color.label}`}
                    >
                      {themeColor === color.name && (
                        <Check size={16} className="text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                  <span>Dark Mode</span>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about updates
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={handleNotificationsToggle}
                />
              </div>
            </div>
          </div>

          {/* Password Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lock size={20} className="text-primary" />
              <h2 className="text-xl font-semibold">Password</h2>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label
                  htmlFor="current-password"
                  className="text-sm font-medium block mb-1"
                >
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  className="text-sm font-medium block mb-1"
                >
                  New Password
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium block mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                />
              </div>

              <Button type="submit" className="mt-2">
                <Save size={16} className="mr-2" /> Change Password
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
