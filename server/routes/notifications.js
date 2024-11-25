const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const Student = require("../models/Student");
const sendEmail = require("../utils/sendEmail"); // Utility function for sending emails
const schedule = require("node-schedule");

// Utility function to send emails to students
const sendEmailsToStudents = async (students, title, message, deadline) => {
  try {
    const emailPromises = students.map((student) => {
      const emailOptions = {
        to: student.email,
        subject: `${title} - Notification`,
        text: `${message}\n\nDeadline: ${deadline}`,
      };

      return sendEmail(emailOptions)
        .then(() => {
          console.log(`Email sent to: ${student.email}`);
        })
        .catch((emailError) => {
          console.error(
            `Failed to send email to ${student.email}:`,
            emailError.message
          );
        });
    });

    await Promise.all(emailPromises);
    return students.length; // Return the count of emails sent
  } catch (error) {
    console.error("Error sending emails:", error);
    return 0;
  }
};

// Function to schedule reminder notifications
const scheduleNotificationReminders = async (notification) => {
  const intervals = [15, 10, 5, 3, 1]; // Days before the deadline

  for (const daysBefore of intervals) {
    const notificationDate = new Date(notification.deadline);
    notificationDate.setDate(notificationDate.getDate() - daysBefore);

    // Ensure the scheduled time is in the future
    if (notificationDate > new Date()) {
      const jobData = { notificationId: notification._id, daysBefore };

      try {
        // Store job in MongoDB
        await Notification.updateOne(
          { _id: notification._id },
          { $push: { scheduledJobs: { jobData, runAt: notificationDate } } }
        );

        // Schedule job
        schedule.scheduleJob(notificationDate, () => {
          sendNotificationReminder(notification);
        });

        console.log(`Reminder scheduled for ${daysBefore} days before.`);
      } catch (error) {
        console.error("Error scheduling notification reminder:", error);
      }
    }
  }
};


// Function to send notification reminders to students
const sendNotificationReminder = async (notification) => {
  try {
    const students = await Student.find(notification.criteria);

    console.log(`Criteria: ${JSON.stringify(notification.criteria)}`);
    console.log(`Number of students matching criteria: ${students.length}`);

    if (students.length > 0) {
      const emailCount = await sendEmailsToStudents(
        students,
        `[Reminder] ${notification.title}`,
        notification.message,
        notification.deadline
      );
      console.log(`Reminder sent to ${emailCount} student(s).`);
    } else {
      console.log("No students match the criteria for this reminder.");
    }
  } catch (error) {
    console.error("Error sending notification reminder:", error);
  }
};

// General function to create a notification and send emails
const createNotificationAndSendEmails = async (req, res, criteria) => {
  try {
    const { title, message, deadline } = req.body;

    // Save the notification in the database
    const notification = new Notification({
      title,
      message,
      deadline,
      criteria,
    });
    await notification.save();

    // Fetch students based on criteria
    const students = await Student.find(criteria);
    if (students.length === 0) {
      return res.status(404).json({
        message:
          "Notification created, but no students found with the specified criteria.",
        notification,
      });
    }

    // Send emails to students
    await sendEmailsToStudents(students, title, message, deadline);

    // Schedule reminder notifications
    scheduleNotificationReminders(notification);

    res.status(201).json({
      message: "Notification created and sent to eligible students.",
      notification,
      emailsSent: students.length,
      studentsNotified: students.length,
    });
  } catch (error) {
    console.error("Error creating notification and sending emails:", error);
    res.status(500).json({
      message: "Failed to create notification and send emails.",
      error: error.message,
    });
  }
};

// Routes for creating notifications with specific criteria
router.post("/create/custom-notification", async (req, res) => {
  const { criteria } = req.body;
  await createNotificationAndSendEmails(req, res, criteria);
});

router.post("/create/jvd-notification", async (req, res) => {
  await createNotificationAndSendEmails(req, res, { jvdStatus: "JVD" });
});

router.post("/create/non-jvd-notification", async (req, res) => {
  await createNotificationAndSendEmails(req, res, { jvdStatus: "Non-JVD" });
});

router.post("/create/hosteller-notification", async (req, res) => {
  await createNotificationAndSendEmails(req, res, { hosteller: "Hosteller" });
});

router.post("/create/bus-facility-notification", async (req, res) => {
  await createNotificationAndSendEmails(req, res, { busFacility: "Bus" });
});

router.post("/create/all-students-notification", async (req, res) => {
  await createNotificationAndSendEmails(req, res, {}); // Empty criteria for all students
});

// Route to fetch all notifications
router.get("/notifications", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
});

module.exports = router;
