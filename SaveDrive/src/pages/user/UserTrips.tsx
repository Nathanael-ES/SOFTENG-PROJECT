import React, { useState } from 'react';
import { Calendar, Search, Filter, ArrowUpDown, MapPin, Clock, Car } from 'lucide-react';
import UserLayout from '../../components/layouts/UserLayout';
import { format } from 'date-fns';
import { mockUserTrips } from '../../utils/mockData';

const UserTrips: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter trips based on search and date
  const filteredTrips = mockUserTrips.filter(trip => {
    const matchesSearch = trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.to.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesDate = true;
    const tripDate = new Date(trip.date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateFilter === 'today') {
      matchesDate = tripDate.toDateString() === today.toDateString();
    } else if (dateFilter === 'yesterday') {
      matchesDate = tripDate.toDateString() === yesterday.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = tripDate >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = tripDate >= monthAgo;
    }
    
    return matchesSearch && matchesDate;
  });

  // Sort trips
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy === 'distance') {
      const getDistance = (distance: string) => {
        const match = distance.match(/(\d+\.?\d*)\s*km/);
        return match ? parseFloat(match[1]) : 0;
      };
      
      return sortDirection === 'asc'
        ? getDistance(a.distance) - getDistance(b.distance)
        : getDistance(b.distance) - getDistance(a.distance);
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

  // Calculate stats
  const totalTrips = mockUserTrips.length;
  const totalDistance = mockUserTrips.reduce((acc, trip) => {
    const distance = parseFloat(trip.distance.replace(' km', ''));
    return acc + distance;
  }, 0).toFixed(1);
  
  const tripsThisWeek = mockUserTrips.filter(trip => {
    const tripDate = new Date(trip.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return tripDate >= weekAgo;
  }).length;

  return (
    <UserLayout title="My Trips">
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Trips</div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">{totalTrips}</div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-green-100 p-3 dark:bg-green-900">
              <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Distance</div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">{totalDistance} km</div>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-purple-100 p-3 dark:bg-purple-900">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Trips This Week</div>
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">{tripsThisWeek}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-1 flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search trips, locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                  onClick={() => handleSort('date')}
                >
                  Date & Time
                  <ArrowUpDown className={`ml-1 h-4 w-4 flex-shrink-0 ${
                    sortBy === 'date' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <button 
                  className="group inline-flex items-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort('name')}
                >
                  Trip Name
                  <ArrowUpDown className={`ml-1 h-4 w-4 flex-shrink-0 ${
                    sortBy === 'name' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Route
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                <button 
                  className="group inline-flex items-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  onClick={() => handleSort('distance')}
                >
                  Distance
                  <ArrowUpDown className={`ml-1 h-4 w-4 flex-shrink-0 ${
                    sortBy === 'distance' ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Safety Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            {sortedTrips.map((trip) => (
              <tr key={trip.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(trip.date), 'MMM d, yyyy')}
                  </div>
                  <div>
                    {format(new Date(trip.date), 'h:mm a')}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{trip.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 dark:text-white">{trip.from}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">to</div>
                  <div className="text-sm text-gray-900 dark:text-white">{trip.to}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {trip.distance}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {trip.duration}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    trip.safetyScore >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                    trip.safetyScore >= 60 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {trip.safetyScore}/100
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedTrips.length === 0 && (
        <div className="mt-6 text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No trips found for the selected filters.</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium">{sortedTrips.length}</span> of <span className="font-medium">{mockUserTrips.length}</span> trips
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

export default UserTrips;