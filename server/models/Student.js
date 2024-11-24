const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jvdStatus: { type: String, enum: ['JVD', 'Non-JVD'], required: true },
  semester: { type: Number, required: true }, // Kept as Number
  year: { type: Number, required: true }, // Kept as Number
  hosteller: { type: String, enum: ['Hosteller', 'Non-Hosteller'], required: true },
  busFacility: { type: String, enum: ['Bus', 'Non-Bus'], required: true, default: 'Non-Bus' }
}, { timestamps: true }); // Enable timestamps for createdAt and updatedAt fields

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
