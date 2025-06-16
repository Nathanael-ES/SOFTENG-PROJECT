import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      // Redirect based on email
      if (email.toLowerCase() === 'admin@safedrive.com') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
    }
  };

  // Helper text for demo purposes
  const loginHelp = [
    { role: 'Admin', email: 'admin@safedrive.com', password: 'password' },
    { role: 'Driver', email: 'driver@safedrive.com', password: 'password' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <div className="flex items-center">
              <Shield className="h-10 w-10 text-blue-600 dark:text-blue-500" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">SafeDrive</span>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Or{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400">
                create a new account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
                    <div className="flex">
                      <div className="text-sm text-red-700 dark:text-red-400">
                        {error}
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative mt-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-gray-300 pl-10 pr-10 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Demo login help */}
          <div className="mt-8 rounded-md bg-blue-50 p-4 dark:bg-blue-900/30">
            <div className="text-sm text-blue-700 dark:text-blue-400">
              <p className="font-medium">Demo Accounts:</p>
              <ul className="mt-2 space-y-1">
                {loginHelp.map((account, idx) => (
                  <li key={idx}>
                    <strong>{account.role}:</strong> {account.email} / {account.password}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative flex-1 lg:block">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-blue-800 to-indigo-900">
          <div className="max-w-md p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Drive safer with AI-powered monitoring</h2>
            <p className="text-blue-100 mb-6">
              SafeDrive uses advanced AI technology to detect signs of drowsiness, distraction and impairment, keeping drivers and roads safer.
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold">Enhanced Safety</h3>
                <p className="text-blue-100">Real-time monitoring and alerts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;