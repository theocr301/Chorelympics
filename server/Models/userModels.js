const mongoose = require('../db.js');

const UserSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    unique: true
  },
  pointReward: {
    type: Number,
    default: 0
  },
  assignedChores: {
    type: Array,
    default: []
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  profilePic: {
    type: String,
    default: 'Avatar.svg'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;