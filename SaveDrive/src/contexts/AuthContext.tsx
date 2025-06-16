import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user types
export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@safedrive.com',
    role: 'admin' as UserRole,
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: '2',
    name: 'John Driver',
    email: 'driver@safedrive.com',
    role: 'user' as UserRole,
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
  }
];

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isAdmin: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking for a saved session
  useEffect(() => {
    const savedUser = localStorage.getItem('safedrive_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, we would call an API here
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (user && password === 'password') { // Simple mock password check
      setCurrentUser(user);
      localStorage.setItem('safedrive_user', JSON.stringify(user));
    } else {
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('safedrive_user');
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};