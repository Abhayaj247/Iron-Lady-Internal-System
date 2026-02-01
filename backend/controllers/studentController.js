const Student = require('../models/Student');

/**
 * CREATE - Add new student
 */
exports.createStudent = async (req, res) => {
  try {
    const { name, email, phone, program, enrollmentDate, paymentAmount, paymentStatus, notes, source, referredBy } = req.body;

    // Validation
    if (!name || !email || !phone || !program || !paymentAmount) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, phone, program, paymentAmount'
      });
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: 'A student with this email already exists'
      });
    }

    // Create new student
    const student = new Student({
      name,
      email: email.toLowerCase(),
      phone,
      program,
      enrollmentDate: enrollmentDate || Date.now(),
      paymentAmount,
      paymentStatus: paymentStatus || 'Pending',
      notes,
      source,
      referredBy
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: {
        studentId: student.studentId,
        name: student.name,
        email: student.email
      }
    });
  } catch (error) {
    console.error('Create student error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create student'
    });
  }
};

/**
 * READ - Get all students with pagination, search, and filters
 */
exports.getAllStudents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search = '', 
      program = '', 
      status = '', 
      paymentStatus = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = {};

    // Search by name, email, or phone
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by program
    if (program) {
      query.program = program;
    }

    // Filter by status
    if (status) {
      query.status = status;
    } else {
      // By default, don't show archived students
      query.status = { $ne: 'Archived' };
    }

    // Filter by payment status
    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Determine sort order
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const students = await Student.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .select('-__v');

    // Get total count for pagination
    const total = await Student.countDocuments(query);

    res.json({
      success: true,
      data: {
        students,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          limit: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students'
    });
  }
};

/**
 * READ - Get single student by ID
 */
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).select('-__v');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student'
    });
  }
};

/**
 * UPDATE - Update student information
 */
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if student exists
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // If email is being updated, check for duplicates
    if (updates.email && updates.email.toLowerCase() !== student.email) {
      const existingStudent = await Student.findOne({ 
        email: updates.email.toLowerCase(),
        _id: { $ne: id }
      });

      if (existingStudent) {
        return res.status(409).json({
          success: false,
          message: 'Email already exists for another student'
        });
      }
    }

    // Don't allow updating studentId
    delete updates.studentId;
    delete updates._id;

    // Update student
    Object.keys(updates).forEach(key => {
      student[key] = updates[key];
    });

    await student.save();

    res.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Update student error:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update student'
    });
  }
};

/**
 * DELETE - Delete student
 */
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    await Student.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Student permanently deleted'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete student'
    });
  }
};

/**
 * Get student statistics
 */
exports.getStudentStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments({ status: { $ne: 'Archived' } });
    const activeStudents = await Student.countDocuments({ status: 'Active' });
    const completedStudents = await Student.countDocuments({ status: 'Completed' });
    const droppedStudents = await Student.countDocuments({ status: 'Dropped' });

    // Payment statistics
    const paidCount = await Student.countDocuments({ paymentStatus: 'Paid' });
    const pendingCount = await Student.countDocuments({ paymentStatus: 'Pending' });
    const partialCount = await Student.countDocuments({ paymentStatus: 'Partial' });

    // Revenue statistics
    const revenueData = await Student.aggregate([
      { $match: { paymentStatus: { $in: ['Paid', 'Partial'] } } },
      { $group: { _id: null, total: { $sum: '$paymentAmount' } } }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // Recent enrollments (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentEnrollments = await Student.countDocuments({
      enrollmentDate: { $gte: sevenDaysAgo },
      status: { $ne: 'Archived' }
    });

    res.json({
      success: true,
      data: {
        total: totalStudents,
        byStatus: {
          active: activeStudents,
          completed: completedStudents,
          dropped: droppedStudents
        },
        byPayment: {
          paid: paidCount,
          pending: pendingCount,
          partial: partialCount
        },
        revenue: {
          total: totalRevenue,
          paid: paidCount,
          outstanding: pendingCount + partialCount
        },
        recentEnrollments: {
          last7Days: recentEnrollments
        }
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics'
    });
  }
};

/**
 * Get students by program
 */
exports.getStudentsByProgram = async (req, res) => {
  try {
    const programStats = await Student.aggregate([
      { $match: { status: { $ne: 'Archived' } } },
      {
        $group: {
          _id: '$program',
          count: { $sum: 1 },
          revenue: {
            $sum: {
              $cond: [
                { $in: ['$paymentStatus', ['Paid', 'Partial']] },
                '$paymentAmount',
                0
              ]
            }
          },
          paid: {
            $sum: {
              $cond: [{ $eq: ['$paymentStatus', 'Paid'] }, 1, 0]
            }
          },
          pending: {
            $sum: {
              $cond: [{ $eq: ['$paymentStatus', 'Pending'] }, 1, 0]
            }
          }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: programStats
    });
  } catch (error) {
    console.error('Get program stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve program statistics'
    });
  }
};
