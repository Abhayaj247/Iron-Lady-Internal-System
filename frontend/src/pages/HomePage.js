import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, TrendingUp, Shield, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'}`}>
      {/* Header */}
      <header className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Iron Lady</h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Internal Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-all`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            Student Management
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Made Simple
            </span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Streamline student enrollment, track payments, and manage programs efficiently - all in one place.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              Access Dashboard
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all`}>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-pink-600" size={24} />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Student Management</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Centralized database for 78,000+ alumni and students with complete profile tracking.
            </p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all`}>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Payment Tracking</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Real-time payment status, outstanding balances, and automated follow-ups.
            </p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all`}>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="text-blue-600" size={24} />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Program Administration</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Manage enrollments, track batch schedules, and monitor program capacity.
            </p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all`}>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-indigo-600" size={24} />
            </div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>Secure & Scalable</h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Enterprise-grade security with role-based access control for internal teams.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                78,000+
              </div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Total Alumni</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                15+
              </div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Programs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                100%
              </div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Automated</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                24/7
              </div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-20`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p>© 2026 Iron Lady. Empowering women professionals worldwide.</p>
          <p className="mt-2 text-sm">Internal Management System - Authorized Access Only</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;