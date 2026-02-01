import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { PROGRAMS, PAYMENT_STATUS, STUDENT_STATUS, SOURCES } from '../../utils/constants';
import { validateEmail, validatePhone } from '../../utils/helpers';
import { useTheme } from '../../context/ThemeContext';

const StudentForm = ({ student, onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState(student || {
    name: '',
    email: '',
    phone: '',
    program: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    paymentAmount: 99,
    paymentStatus: 'Pending',
    status: 'Active',
    source: 'Website',
    referredBy: '',
    notes: ''
  });
  const { isDark } = useTheme();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    if (!formData.program) {
      newErrors.program = 'Program is required';
    }

    if (!formData.paymentAmount || formData.paymentAmount < 0) {
      newErrors.paymentAmount = 'Valid payment amount is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div>
        <h4 className={`text-lg font-semibold mb-4 pb-2 border-b border-gray-200 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Personal Information
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
            error={errors.name}
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            required
            error={errors.email}
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            required
            error={errors.phone}
          />

          <Select
            label="Source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            options={SOURCES}
            placeholder="Select source"
          />

          <Input
            label="Referred By"
            name="referredBy"
            value={formData.referredBy}
            onChange={handleChange}
            placeholder="Referrer name (optional)"
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Program Details */}
      <div>
        <h4 className={`text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Program Details
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            options={PROGRAMS}
            required
            error={errors.program}
            placeholder="Select program"
          />

          <Input
            label="Enrollment Date"
            type="date"
            name="enrollmentDate"
            value={formData.enrollmentDate}
            onChange={handleChange}
            required
          />

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={Object.values(STUDENT_STATUS).filter(s => s !== 'Archived')}
            required
          />
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <h4 className={`text-lg font-semibold mb-4 pb-2 border-b border-gray-200 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Payment Information
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Payment Amount (₹)"
            type="number"
            name="paymentAmount"
            value={formData.paymentAmount}
            onChange={handleChange}
            placeholder="0"
            required
            error={errors.paymentAmount}
          />

          <Select
            label="Payment Status"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            options={Object.values(PAYMENT_STATUS)}
            required
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label htmlFor="notes" className={`block text-sm font-semibold mb-1 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Additional notes (optional)"
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          icon={Check}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {student ? 'Update Student' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
};

export default StudentForm;
