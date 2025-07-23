const Chore = require('../Models/choreModels.js');

function parseName(name) {
  name = name.toLowerCase();
  let result = '';
  for (let i = 0; i < name.length; i++) {
    if (name[i-1] === undefined || name[i-1] === '-') {
      result += name[i].toUpperCase();
    } else {
      result += name[i];
    }
  }
  result = result.replaceAll('-', ' ');

  return result;
}

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
      response.status(201).send(`${data.name} added to the chore list`); 
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
      response.status(200).send(`${data.name} marked as complete`);
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
      const data = await Chore.findOneAndUpdate({ name: name}).set('isDone', false);
      response.status(200).send(`${data.name} marked as in progress`);
    } catch (error) {
      response.status(400).send('Something went wrong while marking chore as not completed');
    }
  }
};

exports.assignChore = async function (request, response) {
  const { name } = request.params; 
  const { user } = request.body;

  if (!name || typeof name !== 'string' || !user || typeof user !== 'string') {
    response.status(400).send('Bad Request, Name or User is required and must be a string');
  } else {
    try {
      const data = await Chore.findOneAndUpdate({ name: parseName(name) }).set('assignee', user);
      response.status(200).send(`${data.name} assigned to ${user}`);
    } catch (error) {
      response.status(400).send('Something went wrong while assigning chore');
    }
  }
};

exports.unassignChore = async function (request, response) {
  const { name } = request.params;
  if (!name || typeof name !== 'string') {
    response.status(400).send('Bad Request, Name is required and must be a string');
  } else {
    try {
      const data = await Chore.findOneAndUpdate({ name: name }).set('assignee', 'Unassigned');
      response.status(200).send(`${data.name} Unassigned`);
    } catch (error) {
      response.status(400).send('Something went wrong while assigning chore');
    }
  }
};