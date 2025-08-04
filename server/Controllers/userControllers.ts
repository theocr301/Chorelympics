import { Request, Response } from 'express';
import User, { IUser } from '../Models/userModels';
import { parseName } from '../utils';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await User.find({});
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

export const getCurrentUser = async (req: Request, res: Response) : Promise<void> => {
  try {
    const data = await User.find({ isCurrent: true });
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}

export const generateUser = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body as { name?: string };

  if (!name || typeof name !== 'string') {
    res.status(400).send('Bad Request, Name is required, must be a string and different from existing entries');
    return;
  }
  try {
    const existingUsers = await User.find({});
    const parsedName = parseName(name);
    let found = existingUsers.find((user) => user.name === parsedName);
    let responseData: IUser;
    if (found) {
      const updatedUser = await User.findOneAndUpdate(
        { name: parsedName },
        { $set: { isCurrent: true } },
        { new: true }
      );
      if (!updatedUser) throw new Error('User not found for update');
      responseData = updatedUser;
    } else {
      const newUser = new User({
        name: parsedName,
        isCurrent: true,
      });
      responseData = await newUser.save();
    }
    res.status(201).json(responseData.name);
  } catch (error) {
    console.error(error);
    res.status(400).send('Something went wrong while creating the user. It might already exist in the DB.');
  }
};

export const logoutUser = async (req: Request, res: Response) : Promise<void> => {
  const { user } = req.params;

  try {
    const data = await User.findOneAndUpdate({ name: parseName(user) }, { $set: { 'isCurrent': false } }, { new: true })
    res.status(200);
    res.send(data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
}