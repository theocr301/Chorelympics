const { Chore, pushChore, removeChore } = require('../Models/choreModels.js');
const { parseName } = require('../utils.js');

//TODO add sanity checks for duplicate entries, especially for assign and unassign
//TODO 

exports.getAllChores = async function (request, response) {
  try {
    const data = await Chore.find({});
    response.status(200);
    response.send(data);
  } catch (error) {
    response.status(400);
  }
};

exports.generateChore = async function (request, response) {
  const { name, difficulty, duration } = request.body;

  if (!name || typeof name !== 'string') {
    response.status(400).send('Bad Request, Name is required, must be a string and different from existing entries');
  } else if (!difficulty || typeof difficulty !== 'number') {
    response.status(400).send('Bad Request, Difficulty is a number required for point reward calculation');
  } else if (!duration || typeof duration !== 'number') {
    response.status(400).send('Bad Request, Duration is a number required for point reward calculation');
  } else {
    try {
      const data = await Chore.insertOne(request.body);
      response.status(201).send(data); 
    } catch (error) {
      console.log(error);
      response.status(400).send('Something went wrong while creating the chore, it might already exist in the DB');
    }
  }
};

exports.markChoreComplete = async function (request, response) {
  const { name } = request.params;

  if (!name || typeof name !== 'string') {
    response.status(400).send('Bad Request, Name is required and must be a string');
  } else {
    try {
      const data = await Chore.findOneAndUpdate({ name: parseName(name) }).set('isDone', true);
      response.status(200).send(data);
    } catch (error) {
      response.status(400).send('Something went wrong while marking chore as completed');
    }
  }
};

exports.markChoreNotComplete = async function (request, response) {
  const { name } = request.params;

  if (!name || typeof name !== 'string') {
    response.status(400).send('Bad Request, Name is required and must be a string');
  } else {
    try {
      const data = await Chore.findOneAndUpdate({ name: parseName(name) }).set('isDone', false);
      response.status(200).send(data);
    } catch (error) {
      response.status(400).send('Something went wrong while marking chore as not completed');
    }
  }
};

//TODO might need to refactor this to take user ID
exports.assignChore = async function (request, response) {
  const { user, name } = request.params;

  if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
    response.status(400).send('Bad Request, Name or User is required and must be a string');
  } else {
    try {
      // const data = await Chore.findOneAndUpdate({ name: parseName(name) }).set('assignee', parseName(user));
      const { updatedChore, data } = await pushChore(user, name);
      response.status(200).send({ updatedChore, data });
    } catch (error) {
      console.log(error);
      response.status(400).send('Something went wrong while assigning chore');
    }
  }
};

exports.unassignChore = async function (request, response) {
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