// backend/utils/notificationUtils.js

const nodemailer = require('nodemailer');
const config = require('../config/config'); // Assume you have a config file for email settings

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: config.emailPort,
  secure: config.emailSecure, // true for 465, false for other ports
  auth: {
    user: config.emailUser, // email account user
    pass: config.emailPass, // email account password
  },
});

// Send Email Notification
const sendEmailNotification = async (to, subject, text, html) => {
  const mailOptions = {
    from: config.emailFrom, // Sender address
    to, // List of recipients
    subject, // Subject line
    text, // Plain text body
    html, // HTML body (optional)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Send In-App Notification (Placeholder)
const sendInAppNotification = async (userId, message) => {
  // Placeholder function for sending in-app notifications
  // This could involve saving the notification to a database,
  // pushing it to a real-time system, etc.
  
  try {
    // Example: save to database
    // await Notification.create({ userId, message, read: false });
    console.log(`In-app notification sent to user ${userId}: ${message}`);
    return true;
  } catch (error) {
    console.error('Error sending in-app notification:', error);
    return false;
  }
};

// Send SMS Notification (Placeholder)
const sendSMSNotification = async (phoneNumber, message) => {
  // Placeholder function for sending SMS notifications
  // This could involve integrating with an SMS gateway API.

  try {
    // Example: use an SMS service like Twilio
    // await twilioClient.messages.create({
    //   body: message,
    //   from: config.twilioPhoneNumber,
    //   to: phoneNumber,
    // });
    console.log(`SMS sent to ${phoneNumber}: ${message}`);
    return true;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return false;
  }
};

module.exports = {
  sendEmailNotification,
  sendInAppNotification,
  sendSMSNotification,
};
