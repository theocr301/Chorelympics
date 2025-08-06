import { Request, Response } from 'express';
import User from '../Models/userModels';
import { parseName } from '../utils';

async function getAllUsers (req: Request, res: Response): Promise<void> {
  try {
    const data = await User.find({});
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

async function getCurrentUser (req: Request, res: Response): Promise<void> {
  try {
    const data = await User.findOne({ isCurrent: true });
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}

async function generateUser (req: Request, res: Response): Promise<void> {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.status(400).send('Bad Request, Name is required, must be a string and different from existing entries');
    return;
  }
  
  try {
    const parsedName = parseName(name);
    const existingUser = await User.findOne({ name: parsedName });

    let user;
    if (existingUser) {
      //login existing user
      const updatedUser = await User.findOneAndUpdate(
        { name: parsedName },
        { $set: { isCurrent: true } },
        { new: true }
      );
      user = updatedUser;
    } else {
      //register user as new and login
      const newUser = await User.create({
        name: parsedName,
        isCurrent: true,
      })
      user = newUser;
    }

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).send('Something went wrong while creating the user. It might already exist in the DB.');
  }
};

async function logoutUser (req: Request, res: Response) : Promise<void> {
  try {
    const data = await User.findOneAndUpdate({ isCurrent: true }, { $set: { 'isCurrent': false } }, { new: true })
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}

export { getAllUsers, getCurrentUser, generateUser, logoutUser };