const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
    Username: { type: String,  required: [true, "Username is required"],},
    Password: { type: String, required:[ true,"Description is required"] },
},
{
    timestamps: true,
  });

  const UserInfo = mongoose.model('UserInfo',UserInfoSchema);

  module.exports = UserInfo;
