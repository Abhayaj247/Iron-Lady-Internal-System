import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const StudentTable = ({ students, onEdit, onDelete, loading }) => {
  const { isDark } = useTheme();
  
  const getStatusVariant = (status) => {
    if (status === 'Active') return 'success';
    if (status === 'Completed') return 'info';
    return 'default';
  };

  const getPaymentVariant = (status) => {
    if (status === 'Paid') return 'success';
    if (status === 'Pending') return 'warning';
    return 'orange';
  };

  if (loading) {
    return (
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-12 text-center`}>
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading students...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-12 text-center`}>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-lg`}>No students found.</p>
        <p className={`${isDark ? 'text-gray-500' : 'text-gray-400'} text-sm mt-2`}>Click "Add Student" to get started.</p>
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Student ID
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Name
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Email
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Phone
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Program
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Payment
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Status
              </th>
              <th className={`px-6 py-3 text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Enrolled
              </th>
              <th className={`px-6 py-3 text-right text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} uppercase tracking-wider`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`${isDark ? 'divide-gray-700' : 'divide-gray-200'} divide-y`}>
            {[...students].reverse().map((student) => (
              <tr 
                key={student._id} 
                className={`${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {student.studentId}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {student.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {student.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {student.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="info">
                    {student.program}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <Badge variant={getPaymentVariant(student.paymentStatus)}>
                      {student.paymentStatus}
                    </Badge>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      ₹{student.paymentAmount.toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(student.status)}>
                    {student.status}
                  </Badge>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {formatDate(student.enrollmentDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(student)}
                      className={`text-blue-600 hover:text-blue-800 p-2 ${isDark ? 'hover:bg-gray-600' : 'hover:bg-blue-50'} rounded transition-colors`}
                      title="Edit student"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      className={`text-red-600 hover:text-red-800 p-2 ${isDark ? 'hover:bg-gray-600' : 'hover:bg-red-50'} rounded transition-colors`}
                      title="Delete student"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;