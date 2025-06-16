import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Edit, Save } from 'lucide-react';
import UserLayout from '../../components/layouts/UserLayout';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [editMode, setEditMode] = useState(false);
  const [userForm, setUserForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Anytown, USA',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    licenseNumber: 'DL9876543',
    licenseExpiry: '2026-05-15'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the changes to the backend
    setEditMode(false);
  };

  return (
    <UserLayout title="My Profile">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex flex-col items-center text-center">
              <img
                className="mb-4 h-32 w-32 rounded-full object-cover"
                src={currentUser?.avatarUrl || "https://i.pravatar.cc/150?img=33"}
                alt="Profile"
              />
              <h3 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {currentUser?.name}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Company Driver
              </div>
              <div className="mt-4 flex justify-center space-x-3">
                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  CDL License
                </div>
                <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                  3+ Years
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">87</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Safety Score</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">152</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Trips</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
              >
                {editMode ? (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-5 w-5" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Account Security
            </h3>
            
            <button className="mb-3 flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <Lock className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Change Password</span>
              </div>
            </button>
            
            <button className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
              </div>
              <div className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                Off
              </div>
            </button>
          </div>
        </div>
        
        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
              Personal Information
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={userForm.name}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-800"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={userForm.email}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-800"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={userForm.phone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-800"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={userForm.address}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-800"
                  />
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Emergency Contact
                </h3>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={userForm.emergencyContact}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-800"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      name="emergencyPhone"
                      value={userForm.emergencyPhone}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Driver License Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      License Number
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={userForm.licenseNumber}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-800"
                    />
                  </div>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      name="licenseExpiry"
                      value={userForm.licenseExpiry}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:disabled:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
              
              {editMode && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserProfile;