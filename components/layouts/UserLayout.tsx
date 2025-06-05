import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bell, 
  User, 
  LogOut, 
  Menu, 
  X, 
  MapPin,
  Shield,
  Camera
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface UserLayoutProps {
  children: React.ReactNode;
  title: string;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children, title }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Live Detection', icon: <Camera size={20} />, path: '/live-detection' },
    { name: 'My Alerts', icon: <Bell size={20} />, path: '/alerts' },
    { name: 'My Trips', icon: <MapPin size={20} />, path: '/trips' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for larger screens */}
      <aside 
        className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">SafeDrive</span>
          </Link>
          <button 
            className="lg:hidden text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors ${
                    location.pathname === item.path ? 'bg-gray-100 dark:bg-gray-700 font-medium text-primary dark:text-white' : ''
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t p-4 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <button
                className="text-gray-500 focus:outline-none lg:hidden"
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </button>
              <h1 className="ml-4 text-2xl font-semibold text-gray-800 dark:text-white">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">2</span>
              </button>
              
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
                  </div>
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={currentUser?.avatarUrl || "https://i.pravatar.cc/150?img=33"}
                    alt="User avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-6">
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default UserLayout;