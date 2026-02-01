import React from 'react';
import { Users, Plus, LogOut, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const Header = ({ onAddStudent }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-primary to-primary-dark dark:from-gray-800 dark:to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 dark:bg-white/10 rounded-lg">
              <Users size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display">
                Iron Lady Internal System
              </h1>
              <p className="text-sm opacity-90">
                Student Enrollment Management
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button
              onClick={onAddStudent}
              variant="secondary"
              icon={Plus}
              className="bg-white text-primary hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Add Student
            </Button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
