const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
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
    default: '../../assets/default'
  }
});

const User = mongoose.model('User', UserSchema);

main().catch(error => console.log(error));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chores');
  console.log(`DB connection established successfully!`);
};

module.exports = User;