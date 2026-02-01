import React from 'react';
import { Search } from 'lucide-react';
import Select from '../common/Select';
import { PROGRAMS, STUDENT_STATUS, PAYMENT_STATUS } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

const SearchFilters = ({ filters, onFilterChange, onSearchChange }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={20} />
          <input
            type="text"
            placeholder="Search by name, email, phone, or ID..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>

        {/* Program Filter */}
        <Select
          name="program"
          value={filters.program}
          onChange={(e) => onFilterChange('program', e.target.value)}
          options={PROGRAMS}
          placeholder="All Programs"
        />

        {/* Status Filter */}
        <Select
          name="status"
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          options={Object.values(STUDENT_STATUS).filter(s => s !== 'Archived')}
          placeholder="All Status"
        />

        {/* Payment Status Filter */}
        <Select
          name="paymentStatus"
          value={filters.paymentStatus}
          onChange={(e) => onFilterChange('paymentStatus', e.target.value)}
          options={Object.values(PAYMENT_STATUS)}
          placeholder="All Payments"
        />
      </div>
    </div>
  );
};

export default SearchFilters;