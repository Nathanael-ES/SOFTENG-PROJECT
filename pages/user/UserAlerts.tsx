import React, { useState } from 'react';
import { Calendar, Search, Filter, ArrowUpDown, Eye } from 'lucide-react';
import UserLayout from '../../components/layouts/UserLayout';
import { format } from 'date-fns';
import { mockUserAlerts } from '../../utils/mockData';

const UserAlerts: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter alerts based on type and date
  const filteredAlerts = mockUserAlerts.filter(alert => {
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;

    let matchesDate = true;
    const alertDate = new Date(alert.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateFilter === 'today') {
      matchesDate = alertDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'yesterday') {
      matchesDate = alertDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = alertDate >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = alertDate >= monthAgo;
    }
    
    return matchesType && matchesDate;
  });

  // Sort alerts
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (sortBy === 'timestamp') {
      return sortDirection === 'asc' 
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === 'type') {
      return sortDirection === 'asc'
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
    } else if (sortBy === 'duration') {
      const getDurationMinutes = (duration: string) => {
        const match = duration.match(/(\d+)\s+min/);
        return match ? parseInt(match[1]) : 0;
      };
      
      return sortDirection === 'asc'
        ? getDurationMinutes(a.duration) - getDurationMinutes(b.duration)
        : getDurationMinutes(b.duration) - getDurationMinutes(a.duration);
    }
    return 0;
  });

  // Handle sort click
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch(type) {
      case 'drowsy':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'drunk':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'distracted':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Count alerts by type
  const alertCounts = {
    drowsy: mockUserAlerts.filter(alert => alert.type === 'drowsy').length,
    distracted: mockUserAlerts.filter(alert => alert.type === 'distracted').length,
    drunk: mockUserAlerts.filter(alert => alert.type === 'drunk').length,
    total: mockUserAlerts.length
  };

  return (
    <UserLayout title="My Alerts">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Alerts</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{alertCounts.total}</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Drowsy Alerts</div>
          <div className="mt-1 text-2xl font-semibold text-blue-600 dark:text-blue-400">{alertCounts.drowsy}</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Distracted Alerts</div>
          <div className="mt-1 text-2xl font-semibold text-yellow-600 dark:text-yellow-400">{alertCounts.distracted}</div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Impairment Alerts</div>
          <div className="mt-1 text-2xl font-semibold text-red-600 dark:text-red-400">{alertCounts.drunk}</div>
        </div>
      </div>

      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative">
            <select
              className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Alert Types</option>
              <option value="drowsy">Drowsy</option>
              <option value="distracted">Distracted</option>
              <option value="drunk">Impairment</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="relative">
            <select
              className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <button 
                  className="group inline-flex items-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort('timestamp')}
                >
                  Date & Time
                  <ArrowUpDown className={`ml-1 h-4 w-4 flex-shrink-0 ${
                    sortBy === 'timestamp' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <button 
                  className="group inline-flex items-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort('type')}
                >
                  Alert Type
                  <ArrowUpDown className={`ml-1 h-4 w-4 flex-shrink-0 ${
                    sortBy === 'type' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <button 
                  className="group inline-flex items-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort('duration')}
                >
                  Duration
                  <ArrowUpDown className={`ml-1 h-4 w-4 flex-shrink-0 ${
                    sortBy === 'duration' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {sortedAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(alert.timestamp), 'MMM d, yyyy')}
                  </div>
                  <div>
                    {format(new Date(alert.timestamp), 'h:mm a')}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getAlertTypeColor(alert.type)}`}>
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {alert.location}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {alert.duration}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <Eye className="mr-1 h-4 w-4" />
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedAlerts.length === 0 && (
        <div className="mt-6 text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No alerts found for the selected filters.</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium">{sortedAlerts.length}</span> of <span className="font-medium">{mockUserAlerts.length}</span> alerts
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Previous
          </button>
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            Next
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserAlerts;