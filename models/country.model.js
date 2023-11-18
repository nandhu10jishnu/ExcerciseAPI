const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countrySchema = new Schema({
    Name: { type: String,  required: [true, "Country is required"],},
    Description: { type: String, required:[ true," Your Description is required"] },
},
{
    timestamps: true,
  });
  const Country = mongoose.model('Country',countrySchema);

  module.exports = Country;
