import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Car, 
  Activity,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { format } from 'date-fns';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockDrivers, mockAlerts } from '../../utils/mockData';

const AdminDashboard: React.FC = () => {
  const totalDrivers = mockDrivers.length;
  const activeDrivers = mockDrivers.filter(driver => driver.status === 'active').length;
  const alertsToday = mockAlerts.filter(alert => 
    new Date(alert.timestamp).toDateString() === new Date().toDateString()
  ).length;
  
  const activeVehicles = 42;
  const todaysDate = format(new Date(), 'EEEE, MMMM do, yyyy');

  // Data for charts
  const alertsData = [
    { name: 'Mon', drowsy: 5, drunk: 2, distracted: 8 },
    { name: 'Tue', drowsy: 7, drunk: 1, distracted: 10 },
    { name: 'Wed', drowsy: 4, drunk: 3, distracted: 7 },
    { name: 'Thu', drowsy: 6, drunk: 2, distracted: 9 },
    { name: 'Fri', drowsy: 8, drunk: 4, distracted: 11 },
    { name: 'Sat', drowsy: 3, drunk: 5, distracted: 6 },
    { name: 'Sun', drowsy: 2, drunk: 1, distracted: 4 },
  ];

  const alertsByType = [
    { name: 'Drowsy', value: 35, color: '#3B82F6' },
    { name: 'Drunk', value: 18, color: '#EF4444' },
    { name: 'Distracted', value: 55, color: '#F59E0B' },
  ];

  const driversData = [
    { name: 'Jan', drivers: 32 },
    { name: 'Feb', drivers: 40 },
    { name: 'Mar', drivers: 45 },
    { name: 'Apr', drivers: 50 },
    { name: 'May', drivers: 58 },
    { name: 'Jun', drivers: 65 },
    { name: 'Jul', drivers: 68 },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-lg text-gray-600 dark:text-gray-400">{todaysDate}</h2>
        <p className="text-xl font-medium text-gray-800 dark:text-white">Welcome back, Admin</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <Users className="h-6 w-6 text-blue-500 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Drivers</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{totalDrivers}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="ml-1 text-xs text-green-500">+12% from last month</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Drivers</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{activeDrivers}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="ml-1 text-xs text-green-500">+8% from last week</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
              <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alerts Today</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{alertsToday}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <span className="ml-1 text-xs text-red-500">-5% from yesterday</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <Car className="h-6 w-6 text-purple-500 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Vehicles</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{activeVehicles}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="ml-1 text-xs text-green-500">+3% from last week</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Weekly Alerts Chart */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Weekly Alerts</h3>
            <div className="flex items-center space-x-2">
              <span className="inline-block h-3 w-3 rounded-full bg-red-500"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Drunk</span>
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Drowsy</span>
              <span className="inline-block h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Distracted</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={alertsData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="drowsy" stackId="a" fill="#3B82F6" />
                <Bar dataKey="drunk" stackId="a" fill="#EF4444" />
                <Bar dataKey="distracted" stackId="a" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts by Type Chart */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Alerts by Type</h3>
          </div>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {alertsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Driver Growth Chart */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Driver Growth</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={driversData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorDrivers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="drivers" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorDrivers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Recent Alerts</h3>
            <a href="/admin/alerts" className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              View all
            </a>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockAlerts.slice(0, 5).map((alert) => (
                <li key={alert.id} className="py-3">
                  <div className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                      alert.type === 'drowsy' ? 'bg-blue-100 dark:bg-blue-900' : 
                      alert.type === 'drunk' ? 'bg-red-100 dark:bg-red-900' : 
                      'bg-yellow-100 dark:bg-yellow-900'
                    }`}>
                      <AlertTriangle className={`h-5 w-5 ${
                        alert.type === 'drowsy' ? 'text-blue-500 dark:text-blue-300' : 
                        alert.type === 'drunk' ? 'text-red-500 dark:text-red-300' : 
                        'text-yellow-500 dark:text-yellow-300'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {alert.driverName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} alert
                      </p>
                    </div>
                    <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(alert.timestamp), 'h:mm a')}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Active Drivers section */}
      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Active Drivers</h3>
          <a href="/admin/drivers" className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            View all drivers
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Driver
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Last Trip
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Safety Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {mockDrivers.filter(driver => driver.status === 'active').slice(0, 5).map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={driver.avatarUrl} 
                          alt={driver.name} 
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{driver.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{driver.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{driver.vehicle}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{driver.licensePlate}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(driver.lastTrip), 'MMM d, h:mm a')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="mr-2 text-sm font-medium text-gray-900 dark:text-white">{driver.safetyScore}</div>
                      <Activity className={`h-5 w-5 ${
                        driver.safetyScore >= 80 ? 'text-green-500' : 
                        driver.safetyScore >= 60 ? 'text-yellow-500' : 
                        'text-red-500'
                      }`} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;