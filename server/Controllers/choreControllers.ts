// const { parseName } = require('../utils.js');
import { parseName } from '../utils';
import { Chore, closeChore, reopenChore, pushChore, removeChore } from '../Models/choreModels';
import { Request, Response } from 'express';

//TODO add sanity checks for duplicate entries, especially for assign and unassign

exports.getAllChores = async function (request: Request, response: Response) {
  try {
    const data = await Chore.find({});
    response.status(200);
    response.send(data);
  } catch (error) {
    response.status(400).send(error);
  }
};

exports.generateChore = async function (request: Request, response: Response) {
  const { name, difficulty } = request.body;


  if (!name || typeof name !== 'string') {
    response.status(400).send('Bad Request, Name is required, must be a string and different from existing entries');
  } else if (!difficulty || typeof difficulty !== 'string') {
    response.status(400).send('Bad Request, Difficulty is a number required for point reward calculation');
  /* } else if (!duration || typeof duration !== 'number') {
    response.status(400).send('Bad Request, Duration is a number required for point reward calculation'); */
  } else {
    try {
      if (difficulty === 'medium') {
        const data = await Chore.insertOne({ name: parseName(name), difficulty: parseName(difficulty), pointReward: 200 });
        response.status(201).send(data); 
      } else if (difficulty === 'hard') {
        const data = await Chore.insertOne({ name: parseName(name), difficulty: parseName(difficulty), pointReward: 300 });
        response.status(201).send(data);
      } else {
        const data = await Chore.insertOne({ name: parseName(name), difficulty: parseName(difficulty), pointReward: 100 });
        response.status(201).send(data);
      }
    } catch (error) {
      console.log(error);
      response.status(400).send('Something went wrong while creating the chore, it might already exist in the DB');
    }
  }
};

exports.markChoreComplete = async function (request: Request, response: Response) {
  const { user, name } = request.params;

  if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
    response.status(400).send('Bad Request, Name is required and must be a string');
  } else {
    try {
      const { updatedChore, data } = await closeChore(user, name);
      response.status(200).send({ updatedChore, data });
    } catch (error) {
      response.status(400).send(error);
    }
  }
};

exports.markChoreNotComplete = async function (request: Request, response: Response) {
  const { user, name } = request.params;

  if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
    response.status(400).send('Bad Request, Name is required and must be a string');
  } else {
    try {
      const { updatedChore, data } = await reopenChore(user, name);
      response.status(200).send({ updatedChore, data });
    } catch (error) {
      response.status(400).send(error);
    }
  }
};

//TODO might need to refactor this to take user ID
exports.assignChore = async function (request: Request, response: Response) {
  const { user, name } = request.params;

  if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
    response.status(400).send('Bad Request, Name or User is required and must be a string');
  } else {
    try {
      const { updatedChore, data } = await pushChore(user, name);
      response.status(200).send({ updatedChore, data });
    } catch (error) {
      console.log(error);
      response.status(400).send('Something went wrong while assigning chore');
    }
  }
};

exports.unassignChore = async function (request: Request, response: Response) {
  const { user, name } = request.params;

  if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
    response.status(400).send('Bad Request, Name or User is required and must be a string');
  } else {
    try {
      const { updatedChore, data } = await removeChore(user, name);
      response.status(200).send({ updatedChore, data });
    } catch (error) {
      console.log(error);
      response.status(400).send('Something went wrong while unassigning chore');
    }
  }
};