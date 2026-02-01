const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// CREATE - Add new student
router.post('/', studentController.createStudent);

// READ - Get all students (with pagination, search, filters)
router.get('/', studentController.getAllStudents);

// READ - Get student statistics
router.get('/stats', studentController.getStudentStats);

// READ - Get students by program
router.get('/by-program', studentController.getStudentsByProgram);

// READ - Get single student by ID
router.get('/:id', studentController.getStudentById);

// UPDATE - Update student
router.put('/:id', studentController.updateStudent);

// DELETE - Delete/Archive student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
