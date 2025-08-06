// const { parseName } = require('../utils.js');
import { parseName } from '../utils';
import Chore from '../Models/choreModels';
import { Request, Response } from 'express';
import User from 'Models/userModels';

const choreDifficultyPoints: Record<string, number> = {
  easy: 100,
  medium: 200,
  hard: 300
}

//! GET - return all chores
export const getAllChores = async function (request: Request, response: Response) {
  try {
    const data = await Chore.find({});
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json(error);
  }
};

//! POST - create new unassigned and open chore
export const generateChore = async function (request: Request, response: Response) {
  const { name, difficulty } = request.body;

  if (!name || typeof name !== 'string') { 
    response.status(400).send('Bad Request, Name is required, must be a string and different from existing entries');
    return;
  } 
  if (!difficulty || typeof difficulty !== 'string') {
    response.status(400).send('Bad Request, Difficulty is a number required for point reward calculation');
    return;
  }

  const parsedName = parseName(name);
  const parsedDifficulty = parseName(difficulty);
  try {
    const data = await Chore.create({
      name: parsedName,
      difficulty: parsedDifficulty,
      pointReward: choreDifficultyPoints[parsedDifficulty],
    })
    response.status(201).json(data);
  } catch (error) {
    console.log(error);
    response.status(400).send('Something went wrong while creating the chore, it might already exist in the DB');
  }
};

export const toggleIsDone = async function (request: Request, response: Response) {
  const { choreId } = request.body;
  if (!choreId) {
    //do not need to check for typeof as already implied by Schema and checks at generateChore and generateUser
    response.status(400).send("Bad Request, chore required");
    return;
  }
  try {
    const updatedChore = await Chore.findByIdAndUpdate(
      choreId, 
      [{ $set: { isDone: { $not: "!isDone"} } }], 
      {new: true}
    );
  } catch (error) {
    response.status(500).json(error);
  }
};
// export const markChoreComplete = async function (request: Request, response: Response) {
//   const { user, name } = request.params;

//   if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
//     response.status(400).send('Bad Request, Name is required and must be a string');
//   } else {
//     try {
//       const { updatedChore, data } = await closeChore(user, name);
//       response.status(200).send({ updatedChore, data });
//     } catch (error) {
//       response.status(400).send(error);
//     }
//   }
// };

// export const markChoreNotComplete = async function (request: Request, response: Response) {
//   const { user, name } = request.params;

//   if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
//     response.status(400).send('Bad Request, Name is required and must be a string');
//   } else {
//     try {
//       const { updatedChore, data } = await reopenChore(user, name);
//       response.status(200).send({ updatedChore, data });
//     } catch (error) {
//       response.status(400).send(error);
//     }
//   }
// };

export const changeAssignment = async function (request: Request, response: Response) {
  const { userId, choreId, assigning } = request.body;
  if (!userId || !choreId) {
    //do not need to check for typeof as already implied by Schema and checks at generateChore and generateUser
    response.status(400).send("Bad Request, user and chore required");
    return;
  }
  try {
    let updatedChore;
    let updatedUser;
    if (assigning) {
      //chore gets assigned
      updatedChore = await Chore.findByIdAndUpdate(
        choreId, 
        { assignee: userId }, 
        { new: true }
      ).populate('assignee');
      //user gets new chore
      updatedUser = await User.findByIdAndUpdate(
        userId, 
        [{ $addToSet: { assignedChores: choreId } }], //ensures no duplicates
        { new: true }
      );
    } else {
      //chore gets unassigned
      updatedChore = await Chore.findByIdAndUpdate(
        choreId,
        { assignee: null },
        { new: true }
      );
      //user removes chore
      updatedUser = await User.findByIdAndUpdate(
        userId,
        [{ $pull: { assignedChores: choreId } }],
        { new: true }
      );
    }

    if (!updatedChore || !updatedUser) {
      response.status(404).send('Bad Request, chore or user not found');
      return;
    }

    response.status(200).json(updatedChore);
  } catch (error) {
    response.status(500).json(error);
  }
};
// export const assignChore = async function (request: Request, response: Response) {
//   const { user, name } = request.params;

//   if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
//     response.status(400).send('Bad Request, Name or User is required and must be a string');
//   } else {
//     try {
//       const { updatedChore, data } = await pushChore(user, name);
//       response.status(200).send({ updatedChore, data });
//     } catch (error) {
//       console.log(error);
//       response.status(400).send('Something went wrong while assigning chore');
//     }
//   }
// };

// export const unassignChore = async function (request: Request, response: Response) {
//   const { user, name } = request.params;

//   if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
//     response.status(400).send('Bad Request, Name or User is required and must be a string');
//   } else {
//     try {
//       const { updatedChore, data } = await removeChore(user, name);
//       response.status(200).send({ updatedChore, data });
//     } catch (error) {
//       console.log(error);
//       response.status(400).send('Something went wrong while unassigning chore');
//     }
//   }
// };