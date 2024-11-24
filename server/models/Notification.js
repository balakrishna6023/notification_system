const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  deadline: { type: Date, required: true },
  criteria: {
    jvdStatus: { type: String, enum: ['JVD', 'Non-JVD'], required: false },
    semester: { type: Number, required: false },
    year: { type: Number, required: false },
    hosteller: { type: String, enum: ['Hosteller', 'Non-Hosteller'], required: false },
    busFacility: { type: String, enum: ['Bus', 'Non-Bus'], required: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
