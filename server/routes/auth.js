// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Register a new student
router.post('/register/student', async (req, res) => {
  const { rollNo, email, password, jvdStatus, semester, year, hosteller, busFacility } = req.body;

  try {
    // Validate that jvdStatus is either 'JVD' or 'Non-JVD'
    if (!['JVD', 'Non-JVD'].includes(jvdStatus)) {
      return res.status(400).json({ message: 'Invalid JVD status. Choose either "JVD" or "Non-JVD".' });
    }

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email already exists.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const newStudent = new Student({
      rollNo,
      email,
      password: hashedPassword,
      jvdStatus,
      semester,
      year,
      hosteller,
      busFacility,
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully.' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Error registering student.' });
  }
});

// Student login
router.post('/login/student', async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, message: 'Student logged in successfully.' });
  } catch (error) {
    console.error('Error logging in student:', error);
    res.status(500).json({ message: 'Error logging in student.' });
  }
});

// Register a new admin
router.post('/register/admin', async (req, res) => {
  const { username, email, password, adminCode } = req.body;

  try {
    // Check admin code validity
    if (adminCode !== process.env.ADMIN_CODE) { // Ensure you're using the code from your .env
      return res.status(400).json({ message: 'Invalid admin code.' });
    }

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      adminCode, // Include adminCode here
    });

    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully.' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'Error registering admin.' });
  }
});

// Admin login
router.post('/login/admin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, message: 'Admin logged in successfully.' });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ message: 'Error logging in admin.' });
  }
});

module.exports = router;
