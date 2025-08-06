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
// // TODO build a function here that imports User from userModel and pushed the chore id to the user choresArray - done i think?
// // TODO find the correct chore, invoke this function in choreController - done i think?
// //assign
// const pushChore = async function (user: string, choreName: string): Promise<any> {
//   try {
//     const updatedChore = await Chore.findOneAndUpdate(
//       { name: parseName(choreName) }, 
//       { $set: { 'assignee': parseName(user) } }, 
//       { new: true }
//     ) as IChore;
//     const data = await User.findOneAndUpdate(
//       { name: parseName(user) }, 
//       { $push: { 'assignedChores': updatedChore.name } }, 
//       { new: true }
//     ); //! add User interface
//     return { updatedChore, data };
//   } catch (error) {
//     console.error('Something went wrong while assigning chore to user chore list', error);
//     return error;
//   }
// };

// //TODO refactor this to follow pushCore - done i think?
// //unassign
// const removeChore = async function (user: string, choreName: string): Promise<any> {
//   try {
//     const updatedChore = await Chore.findOneAndUpdate(
//       { name: parseName(choreName) }, 
//       { $set: { 'assignee': 'Unassigned' } }, 
//       { new: true }
//     ) as IChore;
//     const data = await User.findOneAndUpdate(
//       { name: parseName(user) }, 
//       { $pull: { 'assignedChores': updatedChore.name } },
//       { new: true }
//     ); //! add User interface
//     return { updatedChore, data };
//   } catch (error) {
//     console.error('Something went wrong while unassigning chore from user chore list', error);
//     return error;
//   }
// };
// //mark as done
// const closeChore = async function (user: string, choreName: string): Promise<any> {
//   try {
//     const updatedChore = await Chore.findOneAndUpdate(
//       { name: parseName(choreName) }, 
//       { $set: { 'isDone': true, 'assignee': parseName(user) } }, 
//       { new: true }
//     ) as IChore;
//     const userData = await User.findOne(
//       { name: parseName(user) }
//     ); //! add User interface
//     const updatedPoints = userData!.pointReward + updatedChore.pointReward;
//     const data = await User.findOneAndUpdate(
//       { name: parseName(user) }, 
//       { $set: { 'pointReward': updatedPoints }, $push: { 'assignedChores': updatedChore.name }}, 
//       { new: true }
//     ); //! add User interface
//     return { updatedChore, data };
//   } catch (error) {
//     console.error('Something went wrong while marking chore as complete', error);
//     return error;
//   }
// };
// //mark as not done
// const reopenChore = async function (user: string, choreName: string): Promise<any> {
//   try {
//     const updatedChore = await Chore.findOneAndUpdate(
//       { name: parseName(choreName) }, 
//       { $set: { 'isDone': false } }, 
//       { new: true }
//     ) as IChore;
//     const userData = await User.findOne(
//       { name: parseName(user) }
//     ); //! add User interface
//     const updatedPoints = userData!.pointReward - updatedChore.pointReward;
//     const data = await User.findOneAndUpdate(
//       { name: parseName(user) }, 
//       { $set: { 'pointReward': updatedPoints }}, 
//       { new: true }
//     ); //! add User interface
//     return { updatedChore, data };
//   } catch (error) {
//     console.error('Something went wrong while reopening the chore', error);
//     return error;
//   }
// };
