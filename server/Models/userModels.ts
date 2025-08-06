//import db from '../db';
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  pointReward: number;
  assignedChores: string[];
  isCurrent: boolean;
  profilePic: string;
}


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
  assignedChores: { //TODO change to Array of Object Id of chores
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

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;