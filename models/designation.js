const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const designationSchema = new Schema({
  Name: { type: String,  required: [true, "Your username is required"],},
  Description: { type: String, required:[ true,"Desicription is required"] },
  Active: {type: Boolean, required: [true,""] },
}, {
  timestamps: true,
});

const Designation = mongoose.model('Designation', designationSchema);

module.exports = Designation;