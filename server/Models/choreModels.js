const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChoreSchema = new Schema({
  name: {
    type: String, 
    required: true,
    unique: true
  },
  difficulty: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  isDone: {
    type: Boolean, 
    default: false
  },
  pointReward: {
    type: Number,
    default: 0
  },
  assignee: {
    type: String,
    default: 'Unassigned',
  }
});

const Chore = mongoose.model('Chore', ChoreSchema);

main().catch(error => console.log(error));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chores');
  console.log(`DB connection established successfully!`)
}

module.exports = Chore;