import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Moon, Sun, ArrowRight, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const isAdmin = formData.email === 'admin@ironlady.com' && formData.password === 'Admin@123';
    const isDemo = formData.email === 'demo@ironlady.com' && formData.password === 'Demo@123';

    if (isAdmin) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userRole', 'admin');
      navigate('/dashboard');
    } else if (isDemo) {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userRole', 'demo');
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const quickFill = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'} flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 p-3 rounded-full ${isDark ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-lg hover:scale-110 transition-all z-50`}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl mb-4 shadow-xl transform hover:rotate-6 transition-transform">
            <GraduationCap className="text-white" size={40} />
          </div>
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
            Welcome Back
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Iron Lady Management System
          </p>
        </div>

        {/* Main Login Card */}
        <div className={`${isDark ? 'bg-gray-800/90 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-xl'} rounded-3xl shadow-2xl p-8 border ${isDark ? 'border-gray-700' : 'border-white'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Email Address
              </label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-purple-500 transition-colors`} size={20} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@ironlady.com"
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl transition-all ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white'
                  } focus:outline-none focus:ring-4 focus:ring-purple-500/10`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className={`block text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                Password
              </label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'} group-focus-within:text-purple-500 transition-colors`} size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl transition-all ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-gray-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white'
                  } focus:outline-none focus:ring-4 focus:ring-purple-500/10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  id="remember"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2" 
                />
                <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Remember me
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Show/Hide Test Credentials Toggle */}
          <div className="mt-6">
            <button
              onClick={() => setShowCredentials(!showCredentials)}
              className={`w-full py-3 rounded-xl border-2 border-dashed transition-all flex items-center justify-center gap-2 ${
                isDark 
                  ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300' 
                  : 'border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              <Info size={18} />
              <span className="text-sm font-medium">
                {showCredentials ? 'Hide' : 'Show'} Test Credentials
              </span>
            </button>

            {/* Collapsible Credentials Section */}
            {showCredentials && (
              <div className="mt-4 space-y-3 animate-slide-down">
                {/* Demo Account */}
                <button
                  onClick={() => quickFill('demo@ironlady.com', 'Demo@123')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isDark 
                      ? 'bg-blue-900/20 border-blue-700 hover:bg-blue-900/30' 
                      : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-blue-300' : 'text-blue-900'}`}>
                        🔵 Demo Account
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>
                        demo@ironlady.com / Demo@123
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        View-only access
                      </p>
                    </div>
                    <ArrowRight size={18} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                  </div>
                </button>

                {/* Admin Account */}
                <button
                  onClick={() => quickFill('admin@ironlady.com', 'Admin@123')}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    isDark 
                      ? 'bg-purple-900/20 border-purple-700 hover:bg-purple-900/30' 
                      : 'bg-purple-50 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
                        🟣 Admin Account
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                        admin@ironlady.com / Admin@123
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Full system access
                      </p>
                    </div>
                    <ArrowRight size={18} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Contact IT Support */}
          <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'} border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
            <p className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Need access? Contact IT Department
            </p>
            <p className={`text-sm text-center font-semibold mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              📧 admin@ironlady.com
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;