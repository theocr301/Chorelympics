import mongoose from '../db';
import { IUser } from '../Models/userModels';
import { Model } from 'mongoose';

//TODO: interface
export interface IChore extends mongoose.Document {
  name: string,
  difficulty: string,
  duration: number,
  isDone: boolean,
  pointReward: number,
  assignee: Model<IUser>,
}

const ChoreSchema = new mongoose.Schema<IChore>({
  name: {
    type: String, 
    required: true,
    unique: true
  },
  difficulty: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
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
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null
  }
});

const Chore: Model<IChore> = mongoose.model<IChore>('Chore', ChoreSchema);

export default Chore;