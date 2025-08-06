import mongoose from '../db';
import { Model } from 'mongoose';
import { IChore } from './choreModels';

export interface IUser extends mongoose.Document {
  name: string;
  pointReward: number;
  assignedChores: Model<IChore>[];
  isCurrent: boolean;
  profilePic: string;
}


const UserSchema = new mongoose.Schema<IUser>({
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
    type: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Chore',
    }],
    default: [],
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