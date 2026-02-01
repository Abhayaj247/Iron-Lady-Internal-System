const mongoose = require('mongoose');

/* =========================
   Counter Schema (INLINE)
   ========================= */
const counterSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

const Counter = mongoose.model('Counter', counterSchema);

/* =========================
   Student Schema
   ========================= */
const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  program: {
    type: String,
    required: true,
    enum: ['Masterclass', 'LEP', 'MBW', '1 Crore Club', '100 Board Members']
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  paymentAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Partial'],
    default: 'Pending'
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Dropped', 'Archived'],
    default: 'Active'
  },
  notes: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    enum: ['Website', 'Referral', 'Social Media', 'Event', 'Other'],
    default: 'Website'
  },
  referredBy: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

/* =========================
   Indexes
   ========================= */
studentSchema.index({ name: 'text', email: 'text' });
studentSchema.index({ program: 1, status: 1 });
studentSchema.index({ paymentStatus: 1 });
studentSchema.index({ enrollmentDate: -1 });

/* =========================
   Pre-save Hook (FIXED)
   ========================= */
studentSchema.pre('save', async function (next) {
  if (this.studentId) return next();

  try {
    const Student = mongoose.model('Student');

    // ✅ Check if students collection is empty
    const studentCount = await Student.countDocuments();

    if (studentCount === 0) {
      // Reset counter if no students exist
      await Counter.findOneAndUpdate(
        { name: 'studentId' },
        { seq: 0 },
        { upsert: true }
      );
    }

    const counter = await Counter.findOneAndUpdate(
      { name: 'studentId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.studentId = `STU${String(counter.seq).padStart(6, '0')}`;
    next();
  } catch (err) {
    next(err);
  }
});


/* =========================
   Virtuals
   ========================= */
studentSchema.virtual('isPaymentComplete').get(function () {
  return this.paymentStatus === 'Paid';
});

/* =========================
   Static Methods
   ========================= */
studentSchema.statics.getActiveCount = function () {
  return this.countDocuments({ status: 'Active' });
};

studentSchema.statics.getTotalRevenue = function () {
  return this.aggregate([
    { $match: { paymentStatus: { $in: ['Paid', 'Partial'] } } },
    { $group: { _id: null, total: { $sum: '$paymentAmount' } } }
  ]);
};

module.exports = mongoose.model('Student', studentSchema);
