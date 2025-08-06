import { parseName } from '../utils';
import Chore from '../Models/choreModels';
import { Request, Response } from 'express';
import User from '../Models/userModels';

const choreDifficultyPoints: Record<string, number> = {
  easy: 100,
  medium: 200,
  hard: 300
}

//! GET - return all chores
async function getAllChores(request: Request, response: Response) {
  try {
    const data = await Chore.find({}).populate('assignee');
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json(error);
  }
};

//! POST - create new unassigned and open chore
async function generateChore (request: Request, response: Response) {
  const { choreName, difficulty } = request.body;
  
  if (!choreName || typeof choreName !== 'string') { 
    response.status(400).send('Bad Request, Name is required, must be a string and different from existing entries');
    return;
  } 
  if (!difficulty || typeof difficulty !== 'string') {
    response.status(400).send('Bad Request, Difficulty is a number required for point reward calculation');
    return;
  }
  
  const parsedName = parseName(choreName);
  const parsedDifficulty = parseName(difficulty).toLowerCase().trim();
  
  if (!['easy', 'medium', 'hard'].includes(parsedDifficulty)) {
    response.status(400).send('Bad Request, Difficulty must be "easy", "medium", or "hard"');
    return;
  }

  try {
    const data = await Chore.create({
      name: parsedName,
      difficulty: parsedDifficulty,
      pointReward: choreDifficultyPoints[parsedDifficulty],
      assignee: null,
    })
    response.status(201).json(data);
  } catch (error) {
    console.log(error);
    response.status(400).send('Something went wrong while creating the chore, it might already exist in the DB');
  }
};

//! PUT - open or close chore
async function toggleIsDone (request: Request, response: Response) {
  const { choreId } = request.body;
  if (!choreId) {
    response.status(400).send("Bad Request, chore required");
    return;
  }
  try {
    const choreToUpdate = await Chore.findById(choreId);
    if (!choreToUpdate) {
      response.status(404).send('Bad Request, chore not found');
      return;
    }

    const userId = choreToUpdate.assignee;
    const pointChange = choreToUpdate.pointReward;
    const newIsDone = !choreToUpdate.isDone;

    const updatedChore = await Chore.findByIdAndUpdate(
      choreId, 
      { isDone: newIsDone }, 
      {new: true}
    ).populate('assignee');

    let updatedUser;
    if (userId) {
      updatedUser = await User.findById(userId);
      if (updatedUser) {
        const updatedPoints = newIsDone
          ? updatedUser.pointReward + pointChange
          : updatedUser.pointReward - pointChange;
        await User.findByIdAndUpdate(userId, { pointReward: updatedPoints }, { new: true })
      }
    }
    response.status(200).json(updatedChore);
  } catch (error) {
    response.status(500).json(error);
  }
};

//! PUT - assign and unassign chore to a user
async function changeAssignment (request: Request, response: Response) {
  const { userId, choreId, assigningBool } = request.body;
  if (!userId || !choreId) {
    //do not need to check for typeof as already implied by Schema and checks at generateChore and generateUser
    response.status(400).send("Bad Request, user and chore required");
    return;
  }
  try {
    let updatedChore;
    let updatedUser;
    if (assigningBool) {
      //chore gets assigned
      updatedChore = await Chore.findByIdAndUpdate(
        choreId, 
        { assignee: userId }, 
        { new: true }
      ).populate('assignee');
      //user gets new chore
      updatedUser = await User.findByIdAndUpdate(
        userId, 
        { $addToSet: { assignedChores: choreId } }, //ensures no duplicates
        { new: true }
      );
    } else {
      //chore gets unassigned
      updatedChore = await Chore.findByIdAndUpdate(
        choreId,
        { assignee: null },
        { new: true }
      ).populate('assignee');
      //user removes chore
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { assignedChores: choreId } },
        { new: true }
      );
    }

    if (!updatedChore || !updatedUser) {
      response.status(404).send('Bad Request, chore or user not found');
      return;
    }
    response.status(200).json(updatedChore);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

export { getAllChores, generateChore, toggleIsDone, changeAssignment };