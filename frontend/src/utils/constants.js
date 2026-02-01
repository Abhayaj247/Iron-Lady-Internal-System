// Program options
export const PROGRAMS = [
  'Masterclass',
  'LEP',
  'MBW',
  '1 Crore Club',
  '100 Board Members'
];

// Status options
export const STUDENT_STATUS = {
  ACTIVE: 'Active',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  ARCHIVED: 'Archived'
};

// Payment status options
export const PAYMENT_STATUS = {
  PENDING: 'Pending',
  PAID: 'Paid',
  PARTIAL: 'Partial'
};

// Source options
export const SOURCES = [
  'Website',
  'Referral',
  'Social Media',
  'Event',
  'Other'
];

// Status colors for badges
export const STATUS_COLORS = {
  Active: 'bg-green-100 text-green-800',
  Completed: 'bg-blue-100 text-blue-800',
  Dropped: 'bg-gray-100 text-gray-800',
  Archived: 'bg-red-100 text-red-800'
};

export const PAYMENT_COLORS = {
  Paid: 'bg-green-100 text-green-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  Partial: 'bg-orange-100 text-orange-800'
};

// Table pagination
export const ITEMS_PER_PAGE = 20;
