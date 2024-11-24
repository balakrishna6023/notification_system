const nodemailer = require("nodemailer");

const sendEmail = async (emailOptions) => {
  // Create a transporter using environment variables for security
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail", // Allow flexibility for other providers
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email app password (not account password)
    },
    tls: {
      rejectUnauthorized: false, // Prevent TLS issues in some hosting environments
    },
  });

  try {
    // Send the email using the provided options
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender's email
      ...emailOptions, // Include provided email options (to, subject, text, etc.)
    });

    console.log(
      `Email sent successfully to ${emailOptions.to}: ${info.response}`
    );
    return info; // Return the response for additional logging or debugging if needed
  } catch (error) {
    console.error(`Error sending email to ${emailOptions.to}:`, error.message);
    throw new Error(`Failed to send email to ${emailOptions.to}`);
  }
};

module.exports = sendEmail;
