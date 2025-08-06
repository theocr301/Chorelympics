import { Chore, User } from '../types/types';
import { Types } from 'mongoose';

const baseUrl = 'http://localhost:3000';

//! USER
async function getAllUsers(): Promise<User[] | undefined> {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getCurrentUser(): Promise<User | undefined> {
  try {
    const response = await fetch(`${baseUrl}/users/current`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function generateUser(name: string): Promise<User | undefined> {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function logoutUser(): Promise<User | undefined> {
  try {
    const response = await fetch(`${baseUrl}/users/logout`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


//! CHORE
async function getAllChores(): Promise<Chore[] | undefined> {
  try {
    const response = await fetch(`${baseUrl}/chores`);

    if (!response.ok) throw new Error('Failed to fetch chores');

    const data: Chore[] = await response.json();
    const sortedData = data.sort((a, b) => a.pointReward - b.pointReward);
    return sortedData;
  } catch (error) {
    console.log(error);
  }
}

async function generateChore(choreName: string, difficulty: 'easy' | 'medium' | 'hard'): Promise<Chore | undefined> {
  const parsedChoreName = choreName.toLowerCase();
  try {
    const response = await fetch(`${baseUrl}/chores`, {
      method: "POST",
      body: JSON.stringify({ choreName: parsedChoreName, difficulty}),
      headers: { "Content-type": "application/json" }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function toggleIsDone(choreId: Types.ObjectId) {
  try {
    const response = await fetch(`${baseUrl}/chores/toggleIsDone`, {
      method: "PUT",
      body: JSON.stringify({ choreId }),
      headers: { "Content-Type": "application/json"}
    })
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function changeAssignment(userId: Types.ObjectId, choreId: Types.ObjectId, assigningBool: boolean) {
  try {
    const response = await fetch(`${baseUrl}/chores/change-assignment`, {
      method: "PUT",
      body: JSON.stringify({ userId, choreId, assigningBool }),
      headers: { "Content-Type": "application/json"}
    })
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export { 
  getAllUsers, 
  getCurrentUser, 
  generateUser, 
  logoutUser, 
  getAllChores, 
  generateChore, 
  toggleIsDone, 
  changeAssignment 
};