const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Notification = require('../models/Notification');

// GET student details based on email
router.get('/details', async (req, res) => {
    const email = req.query.email; // Get email from query parameters
    console.log('Fetching details for email:', email);

    try {
        const student = await Student.findOne({ email });

        if (!student) {
            console.log('Student not found.');
            return res.status(404).json({ success: false, message: 'Student not found.' });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        console.error('Error fetching student details:', error.message);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});

// GET notifications based on student's criteria
router.get('/notifications', async (req, res) => {
    const email = req.query.email;
    console.log('Fetching notifications for email:', email);

    try {
        // Find the student by email
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found.' });
        }

        console.log('Student found:', student);

        // Fetch notifications that match the student's criteria
        const notifications = await Notification.find({
            $and: [
                {
                    $or: [
                        { 'criteria.jvdStatus': student.jvdStatus },
                        { 'criteria.jvdStatus': { $exists: false } }, // Include if not specified
                    ]
                },
                {
                    $or: [
                        { 'criteria.semester': student.semester },
                        { 'criteria.semester': { $exists: false } }, // Include if not specified
                    ]
                },
                {
                    $or: [
                        { 'criteria.year': student.year },
                        { 'criteria.year': { $exists: false } }, // Include if not specified
                    ]
                },
                {
                    $or: [
                        { 'criteria.hosteller': student.hosteller },
                        { 'criteria.hosteller': { $exists: false } }, // Include if not specified
                    ]
                },
                {
                    $or: [
                        { 'criteria.busFacility': student.busFacility },
                        { 'criteria.busFacility': { $exists: false } }, // Include if not specified
                    ]
                }
            ]
        });

        console.log('Notifications found:', notifications);

        // Return the found notifications
        res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ success: false, message: 'Server error: ' + error.message });
    }
});


module.exports = router;
