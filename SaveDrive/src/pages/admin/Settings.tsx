import React, { useState } from 'react';
import { Save, Bell, Shield, FileText, AlertTriangle, Eye, EyeOff, Globe } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';

const Settings: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [alertThresholds, setAlertThresholds] = useState({
    drowsiness: 75,
    drunkDetection: 80,
    distraction: 70
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    pushNotifications: false,
    sendDriverReports: true
  });

  const handleThresholdChange = (type: keyof typeof alertThresholds, value: number) => {
    setAlertThresholds(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleNotificationChange = (type: keyof typeof notificationSettings, checked: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  return (
    <AdminLayout title="Settings">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Alert Thresholds */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center">
            <AlertTriangle className="mr-2 h-6 w-6 text-yellow-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Alert Thresholds</h2>
          </div>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Set sensitivity thresholds for different types of alerts. Higher values mean more sensitivity (more alerts).
          </p>
          
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Drowsiness Detection
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {alertThresholds.drowsiness}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={alertThresholds.drowsiness}
                onChange={(e) => handleThresholdChange('drowsiness', parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Less Sensitive</span>
                <span>More Sensitive</span>
              </div>
            </div>
            
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Drunk Detection
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {alertThresholds.drunkDetection}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={alertThresholds.drunkDetection}
                onChange={(e) => handleThresholdChange('drunkDetection', parseInt(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Less Sensitive</span>
                <span>More Sensitive</span>
              </div>
            </div>
            
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Distraction Detection
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {alertThresholds.distraction}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={alertThresholds.distraction}
                onChange={(e) => handleThresholdChange('distraction', parseInt(e.target.value))}
                className="w-full accent-yellow-600"
              />
              <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Less Sensitive</span>
                <span>More Sensitive</span>
              </div>
            </div>
          </div>
          
          <button className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
            <Save className="mr-2 h-4 w-4" />
            Save Thresholds
          </button>
        </div>
        
        {/* Notification Settings */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center">
            <Bell className="mr-2 h-6 w-6 text-blue-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Notification Settings</h2>
          </div>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Configure how you want to receive alerts and notifications from the system.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="email-notifications"
                type="checkbox"
                checked={notificationSettings.email}
                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label htmlFor="email-notifications" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="sms-notifications"
                type="checkbox"
                checked={notificationSettings.sms}
                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label htmlFor="sms-notifications" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                SMS Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="push-notifications"
                type="checkbox"
                checked={notificationSettings.pushNotifications}
                onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label htmlFor="push-notifications" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Push Notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="driver-reports"
                type="checkbox"
                checked={notificationSettings.sendDriverReports}
                onChange={(e) => handleNotificationChange('sendDriverReports', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <label htmlFor="driver-reports" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Send Weekly Driver Reports
              </label>
            </div>
          </div>
          
          <button className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
            <Save className="mr-2 h-4 w-4" />
            Save Notification Settings
          </button>
        </div>
        
        {/* API Access */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center">
            <Shield className="mr-2 h-6 w-6 text-green-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">API Access</h2>
          </div>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Manage your API keys and access for integration with other systems.
          </p>
          
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              API Key
            </label>
            <div className="flex">
              <input
                type={showApiKey ? "text" : "password"}
                value="sk_live_8f731a50d8ert4bc6719ed62a"
                readOnly
                className="block w-full rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-200 px-3 text-gray-500 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
              >
                {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Keep this key secret. Do not share it in public repositories or client-side code.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
              Regenerate Key
            </button>
            <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
              <FileText className="mr-2 h-4 w-4" />
              View API Docs
            </button>
          </div>
        </div>
        
        {/* System Settings */}
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center">
            <Globe className="mr-2 h-6 w-6 text-purple-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">System Settings</h2>
          </div>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Configure global system settings and preferences.
          </p>
          
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Time Zone
            </label>
            <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
              <option value="UTC">UTC (Coordinated Universal Time)</option>
              <option value="EST">EST (Eastern Standard Time)</option>
              <option value="CST">CST (Central Standard Time)</option>
              <option value="MST">MST (Mountain Standard Time)</option>
              <option value="PST">PST (Pacific Standard Time)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Data Retention Period
            </label>
            <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Default Language
            </label>
            <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="pt">Portuguese</option>
            </select>
          </div>
          
          <button className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
            <Save className="mr-2 h-4 w-4" />
            Save System Settings
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;