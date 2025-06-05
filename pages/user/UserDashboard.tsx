import React from 'react';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Activity, 
  Car,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import UserLayout from '../../components/layouts/UserLayout';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
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
  Legend
} from 'recharts';
import { mockUserTrips, mockUserAlerts } from '../../utils/mockData';

const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const todaysDate = format(new Date(), 'EEEE, MMMM do, yyyy');
  
  const safetyScore = 87;
  const tripsToday = mockUserTrips.filter(trip => 
    new Date(trip.date).toDateString() === new Date().toDateString()
  ).length;
  
  const alertsThisWeek = mockUserAlerts.filter(alert => {
    const alertDate = new Date(alert.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return alertDate >= weekAgo;
  }).length;
  
  const hoursThisWeek = 23.5;

  // Data for charts
  const safetyScoreHistory = [
    { date: 'Mon', score: 82 },
    { date: 'Tue', score: 85 },
    { date: 'Wed', score: 80 },
    { date: 'Thu', score: 78 },
    { date: 'Fri', score: 84 },
    { date: 'Sat', score: 88 },
    { date: 'Sun', score: 87 },
  ];

  const alertsHistory = [
    { date: 'Mon', drowsy: 1, distracted: 2 },
    { date: 'Tue', drowsy: 0, distracted: 1 },
    { date: 'Wed', drowsy: 2, distracted: 0 },
    { date: 'Thu', drowsy: 0, distracted: 0 },
    { date: 'Fri', drowsy: 1, distracted: 1 },
    { date: 'Sat', drowsy: 0, distracted: 0 },
    { date: 'Sun', drowsy: 0, distracted: 0 },
  ];

  const upcomingTrips = [
    { id: 1, name: 'City Delivery', date: '2025-07-12T09:00:00', duration: '4 hours' },
    { id: 2, name: 'Airport Pickup', date: '2025-07-13T14:30:00', duration: '2.5 hours' },
    { id: 3, name: 'Interstate Transport', date: '2025-07-15T08:00:00', duration: '8 hours' },
  ];

  return (
    <UserLayout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-lg text-gray-600 dark:text-gray-400">{todaysDate}</h2>
        <p className="text-xl font-medium text-gray-800 dark:text-white">Welcome back, {currentUser?.name}</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <Activity className="h-6 w-6 text-blue-500 dark:text-blue-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Safety Score</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{safetyScore}/100</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="ml-1 text-xs text-green-500">+3% from last week</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <Car className="h-6 w-6 text-green-500 dark:text-green-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Trips Today</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{tripsToday}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <span className="ml-1 text-xs text-red-500">-1 from yesterday</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900">
              <AlertTriangle className="h-6 w-6 text-yellow-500 dark:text-yellow-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alerts This Week</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{alertsThisWeek}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingDown className="h-4 w-4 text-green-500" />
            <span className="ml-1 text-xs text-green-500">-2 from last week</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 transition-all hover:shadow-md">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <Clock className="h-6 w-6 text-purple-500 dark:text-purple-300" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Hours This Week</p>
              <p className="text-2xl font-semibold text-gray-800 dark:text-white">{hoursThisWeek}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="ml-1 text-xs text-green-500">+2.5 from last week</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Safety Score Chart */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Safety Score Trend</h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={safetyScoreHistory}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3B82F6" 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts History Chart */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Weekly Alerts</h3>
            <div className="flex items-center space-x-2">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Drowsy</span>
              <span className="inline-block h-3 w-3 rounded-full bg-yellow-500"></span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Distracted</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={alertsHistory}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="drowsy" stackId="a" fill="#3B82F6" />
                <Bar dataKey="distracted" stackId="a" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Trips and Upcoming Trips */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Trips */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Recent Trips</h3>
            <a href="/trips" className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              View all trips
            </a>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockUserTrips.slice(0, 5).map((trip) => (
                <li key={trip.id} className="py-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Car className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {trip.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {trip.distance} • {trip.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {format(new Date(trip.date), 'MMM d')}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(trip.date), 'h:mm a')}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Upcoming Trips */}
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white">Upcoming Trips</h3>
          </div>
          <div className="overflow-hidden">
            {upcomingTrips.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingTrips.map((trip) => (
                  <li key={trip.id} className="py-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-green-500 dark:text-green-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {trip.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {trip.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {format(new Date(trip.date), 'MMM d')}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {format(new Date(trip.date), 'h:mm a')}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No upcoming trips scheduled.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="mt-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">Recent Alerts</h3>
          <a href="/alerts" className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
            View all alerts
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Alert Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {mockUserAlerts.slice(0, 4).map((alert) => (
                <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(alert.timestamp), 'MMM d, yyyy')}
                    </div>
                    <div>
                      {format(new Date(alert.timestamp), 'h:mm a')}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      alert.type === 'drowsy' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                      alert.type === 'drunk' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {alert.location}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {alert.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;