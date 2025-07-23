const Chore = require('../Models/choreModels.js');

exports.getAllChores = async function (request, response) {
  try {
    const data = await Chore.find({});
    response.status(200);
    response.send(data);
  } catch (error) {
    response.status(400);
  }
}

exports.generateChore = async function (request, response) {
  const { name, difficulty, duration } = request.body;

  if (!name || typeof name !== 'string') {
    response.status(400);
    response.send('Bad Request, Name is required and must be a string');
  } else if (!difficulty || typeof difficulty !== 'number') {
    response.status(400);
    response.send('Bad Request, Difficulty is a number required for point reward calculation');
  } else if (!duration || typeof duration !== 'number') {
    response.status(400);
    response.send('Bad Request, Duration is a number required for point reward calculation');
  } else {
    try {
      const data = await Chore.insertOne(request.body);
      response.status(201);
      response.send(`${data.name} added to the chore list`); 
    } catch (error) {
      response.status(400);
      response.send('Something went wrong while creating the chore');
    }
  }
}