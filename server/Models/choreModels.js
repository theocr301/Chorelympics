const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../Models/userModels.js');
const { parseName } = require('../utils.js');

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

//TODO build a function here that imports User from userModel and pushed the chore id to the user choresArray - done i think?
//TODO find the correct chore, invoke this function in choreController - done i think?
const pushChore = async function (user, choreName) {
  try {
    const updatedChore = await Chore.findOneAndUpdate({ name: parseName(choreName) }, { $set: { 'assignee': parseName(user) } }, { new: true });
    const data = await User.findOneAndUpdate({ name: parseName(user) }, { $push: { 'assignedChores': updatedChore.name } }, { new: true });
    return { updatedChore, data };
  } catch (error) {
    console.error('Something went wrong while assigning chore to user chore list', error);
    return error;
  }
};

//TODO refactor this to follow pushCore - done i think?
const removeChore = async function (user, choreName) {
  try {
    const updatedChore = await Chore.findOneAndUpdate({ name: parseName(choreName) }, { $set: { 'assignee': 'Unassigned' } }, { new: true });
    const data = await User.findOneAndUpdate({ name: parseName(user) }, { $pull: { 'assignedChores': updatedChore.name } }, { new: true })
    return { updatedChore, data };
  } catch (error) {
    console.error('Something went wrong while unassigning chore from user chore list', error);
    return error;
  }
};

const closeChore = async function (user, choreName) {
  try {
    const updatedChore = await Chore.findOneAndUpdate({ name: parseName(choreName) }, { $set: { 'isDone': true } }, { new: true });
    const userData = await User.findOne({ name: parseName(user) });
    const updatedPoints = userData.pointReward + updatedChore.pointReward;
    const data = await User.findOneAndUpdate({ name: parseName(user) }, { $set: { 'pointReward': updatedPoints }}, { new: true });
    return { updatedChore, data };
  } catch (error) {
    console.error('Something went wrong while marking chore as complete', error);
    return error;
  }
};

const reopenChore = async function (user, choreName) {
  try {
    const updatedChore = await Chore.findOneAndUpdate({ name: parseName(choreName) }, { $set: { 'isDone': false } }, { new: true });
    const userData = await User.findOne({ name: parseName(user) });
    const updatedPoints = userData.pointReward - updatedChore.pointReward;
    const data = await User.findOneAndUpdate({ name: parseName(user) }, { $set: { 'pointReward': updatedPoints } }, { new: true });
    return { updatedChore, data };
  } catch (error) {
    console.error('Something went wrong while reopening the chore', error);
    return error;
  }
};

main().catch(error => console.log(error));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chores');
  console.log(`DB connection established successfully!`);
};

module.exports = { Chore, pushChore, removeChore, closeChore, reopenChore };