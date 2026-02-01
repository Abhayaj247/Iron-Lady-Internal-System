import React, { useState, useEffect, useCallback } from 'react';
import { Users, CheckCircle, AlertCircle, IndianRupee } from 'lucide-react';
import Header from '../components/layout/Header';
import StatCard from '../components/dashboard/StatCard';
import SearchFilters from '../components/students/SearchFilters';
import StudentTable from '../components/students/StudentTable';
import StudentForm from '../components/students/StudentForm';
import Modal from '../components/common/Modal';
import Alert from '../components/common/Alert';
import Loader from '../components/common/Loader';
import { studentAPI } from '../services/api';
import { debounce, formatCurrency } from '../utils/helpers';
import { useTheme } from '../context/ThemeContext';

const StudentsPage = () => {
  const { isDark } = useTheme();
  
  // State
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    program: '',
    status: '',
    paymentStatus: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  // Fetch students
  const fetchStudents = useCallback(async () => {
    try {
      const response = await studentAPI.getAllStudents({
        ...filters,
        limit: 100
      });
      setStudents(response.data.students);
    } catch (error) {
      showAlert('error', error.message);
    }
  }, [filters]);

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await studentAPI.getStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      showAlert('error', error.message);
      setLoading(false);
    }
  };

  // Debounced search
  const debouncedFetchStudents = useCallback(
    debounce(fetchStudents, 500),
    [filters]
  );

  // Initial load
  useEffect(() => {
    fetchStats();
  }, []);

  // Fetch students when filters change
  useEffect(() => {
    if (filters.search) {
      debouncedFetchStudents();
    } else {
      fetchStudents();
    }
  }, [filters, debouncedFetchStudents, fetchStudents]);

  // Handlers
  const handleAddStudent = () => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'demo') {
      showAlert('error', 'Demo users cannot add students. Login as admin for full access.');
      return;
    }
    setEditingStudent(null);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'demo') {
      showAlert('error', 'Demo users cannot edit students. Login as admin for full access.');
      return;
    }
    setEditingStudent(student);
    setShowModal(true);
  };

  const handleDeleteStudent = async (student) => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'demo') {
      showAlert('error', 'Demo users cannot delete students. Login as admin for full access.');
      return;
    }
    if (window.confirm(`Are you sure you want to permanently delete ${student.name}?`)) {
      try {
        await studentAPI.deleteStudent(student._id);
        showAlert('success', 'Student permanently deleted');
        fetchStudents();
        fetchStats();
      } catch (error) {
        showAlert('error', error.message);
      }
    }
  };

  const handleSubmitStudent = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        await studentAPI.updateStudent(editingStudent._id, formData);
        showAlert('success', 'Student updated successfully');
      } else {
        await studentAPI.createStudent(formData);
        showAlert('success', 'Student added successfully');
      }
      setShowModal(false);
      fetchStudents();
      fetchStats();
    } catch (error) {
      showAlert('error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSearchChange = (value) => {
    setFilters(prev => ({
      ...prev,
      search: value
    }));
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Header onAddStudent={handleAddStudent} />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Loader size="lg" text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <Header onAddStudent={handleAddStudent} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert */}
        {alert && (
          <div className="mb-6">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={stats.total}
              icon={Users}
              color="blue"
              change={`${stats.byStatus.active} active`}
            />
            <StatCard
              title="Active Students"
              value={stats.byStatus.active}
              icon={CheckCircle}
              color="green"
            />
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats.revenue.total)}
              icon={IndianRupee}
              color="purple"
              change={`${stats.byPayment.paid} paid`}
            />
            <StatCard
              title="Pending Payments"
              value={stats.byPayment.pending}
              icon={AlertCircle}
              color="orange"
              change={`${stats.revenue.outstanding} outstanding`}
            />
          </div>
        )}

        {/* Search & Filters */}
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />

        {/* Students Table */}
        <StudentTable
          students={students}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          loading={false}
        />
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingStudent ? 'Edit Student' : 'Add New Student'}
          size="lg"
        >
          <StudentForm
            student={editingStudent}
            onSubmit={handleSubmitStudent}
            onCancel={() => setShowModal(false)}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
    </div>
  );
};

export default StudentsPage;