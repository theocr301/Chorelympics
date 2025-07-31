const User = require('../Models/userModels.js');
const { parseName } = require('../utils.js');

exports.getAllUsers = async function (request, response) {
  try {
    const data = await User.find({});
    response.status(200);
    response.send(data);
  } catch (error) {
    response.status(400);
    response.send(error);
  }
};

exports.getCurrentUser = async function (request, response) {
  try {
    const data = await User.find({ isCurrent: true });
    response.status(200);
    response.send(data);
  } catch (error) {
    response.status(400);
    response.send(error);
  }
}

exports.generateUser = async function (request, response) {
  const { name } = request.body;

  if (!name || typeof name !== 'string') {
    response.status(400).send('Bad Request, Name is required, must be a string and different from existing entries');
  }
  try {
    var responseData = {};
    const userData = await User.find({});
    var found = userData.find((element) => element.name === name);
    if (found) {
      found = await User.findOneAndUpdate({ name: parseName(name) }, { $set: { 'isCurrent': true } }, { new: true })
      responseData = found;
    } else {
      responseData = await User.insertOne(request.body);
    }
    response.status(201).send(responseData.name);
  } catch (error) {
    console.log(error);
    response.status(400).send('Something went wrong while creating the user, it might already exist in the DB');
  }
};

exports.logoutUser = async function (request, response) {
  const { user } = request.params;

  try {
    const data = await User.findOneAndUpdate({ name: parseName(user) }, { $set: { 'isCurrent': false } }, { new: true })
    response.status(200);
    response.send(data);
  } catch (error) {
    response.status(400);
    response.send(error);
  }
}