const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const registrationSchema = new Schema({
  StudentName: { type: String,  required: [true, "Your Name is required"],},
  FatherName: { type: String, required: true },
  MotherName: { type: String, required: true },
  Gender: { type: String, required: true },
  Email: { type: String, required: true },
  Telephone: { type: Number, required: true },
  DateOfBirth: { type: Date, required: true },
  Level: { type: String, required: true },
}, {
  timestamps: true,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;