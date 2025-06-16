import React, { useState } from 'react';
import { Calendar, Search, Filter, ArrowUpDown, Eye, Download } from 'lucide-react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { format } from 'date-fns';
import { mockAlerts } from '../../utils/mockData';

const AlertsHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter alerts based on search term, type, and date
  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        alert.vehicleId.toLowerCase().includes(searchTerm.toLowerCase());
    
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
    }
    
    return matchesSearch && matchesType && matchesDate;
  });

  // Sort alerts
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (sortBy === 'timestamp') {
      return sortDirection === 'asc' 
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortBy === 'driverName') {
      return sortDirection === 'asc'
        ? a.driverName.localeCompare(b.driverName)
        : b.driverName.localeCompare(a.driverName);
    } else if (sortBy === 'type') {
      return sortDirection === 'asc'
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
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

  return (
    <AdminLayout title="Alerts History">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search driver name, vehicle ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-3 pr-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="drowsy">Drowsy</option>
                <option value="drunk">Drunk</option>
                <option value="distracted">Distracted</option>
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
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <button className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
          <Download className="mr-2 h-5 w-5" />
          Export
        </button>
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
                  Time
                  <ArrowUpDown className={`ml-1 h-4 w-4 flex-shrink-0 ${
                    sortBy === 'timestamp' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <button 
                  className="group inline-flex items-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort('driverName')}
                >
                  Driver
                  <ArrowUpDown className={`ml-1 h-4 w-4 flex-shrink-0 ${
                    sortBy === 'driverName' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Vehicle
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
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{alert.driverName}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">{alert.vehicleId}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getAlertTypeColor(alert.type)}`}>
                    {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {alert.location}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium">{sortedAlerts.length}</span> of <span className="font-medium">{mockAlerts.length}</span> alerts
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
    </AdminLayout>
  );
};

export default AlertsHistory;