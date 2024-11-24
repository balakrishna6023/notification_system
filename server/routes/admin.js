const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Adjust the path to your auth middleware
const Admin = require('../models/Admin'); // Adjust the path to your Admin model
const Notification = require('../models/Notification'); // Adjust the path to your Notification model

// GET admin details
router.get('/details', authMiddleware, async (req, res) => {
  try {
    const adminId = req.user.id; // Assuming you attach user ID in the token
    const admin = await Admin.findById(adminId).select('-password'); // Exclude password

    // If no admin is found
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    res.status(200).json({ success: true, data: admin }); // Return admin details
  } catch (error) {
    console.error('Error fetching admin details:', error.message);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

// GET all notifications (For admins to manage/view)
router.get('/notifications', authMiddleware, async (req, res) => {
  try {
    // Fetch all notifications, assuming that admins have access to all
    const notifications = await Notification.find();

    res.status(200).json({ success: true, data: notifications }); // Return notifications
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
});

module.exports = router;
