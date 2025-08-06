import { Chore, User } from '../types/types';
import { Types } from 'mongoose';

const baseUrl = 'http://localhost:3000';

// function normalizeDifficulty(difficulty: string): "easy" | "medium" | "hard" {
//   switch (difficulty.toLowerCase()) {
//     case 'easy':
//       return 'easy';
//     case 'medium':
//       return 'medium';
//     case 'hard':
//       return 'hard';
//     default:
//       throw new Error('Invalid difficulty level');
//   }
// }

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
    console.log('apiclient generate user data: ', data);
    return data;
  } catch (error) {
    console.log(error);
    console.log('Error creating user');
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
    console.error('Error fetching chores from the server:', error);
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
    console.log('Error creating chore');
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
      console.log('data in toggleIsDone apiclient: ', data);
      return data;
    }
  } catch (error) {
    console.log(error);
    console.log('Error toggling isDone');
  }
}
// export async function completeChore(user: string, name: string): Promise<any>{
//   const parsedUser = user.toLowerCase();
//   const parsedName = name.toLowerCase();
//   try {
//     const response = await fetch(`${baseUrl}/${parsedUser}/chores/markcomplete/${parsedName}`, {
//       method: "PUT",
//     });
//     const data = await response.json();
//     console.log('complete chore data: ', data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     console.log('Error completing chore');
//   }
// }

// export async function reopenChore(user: string, name: string): Promise<any> {
//   const parsedUser = user.toLowerCase();
//   const parsedName = name.toLowerCase();
//   try {
//     const response = await fetch(`${baseUrl}/${parsedUser}/chores/marknotcomplete/${parsedName}`, {
//       method: "PUT",
//     });
//     const data = await response.json();
//     console.log('reopen chore data: ', data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     console.log('Error reopening chore');
//   }
// }

async function changeAssignment(userId: Types.ObjectId, choreId: Types.ObjectId, assigningBool: boolean) {
  try {
    const response = await fetch(`${baseUrl}/chores/change-assignment`, {
      method: "PUT",
      body: JSON.stringify({ userId, choreId, assigningBool }),
      headers: { "Content-Type": "application/json"}
    })
    if (response.ok) {
      const data = await response.json();
      console.log('data in change assignment apiclient: ', data);
      return data;
    }
  } catch (error) {
    console.log(error);
    console.log('Error assigning or unassigning');
  }
}
// export async function assignChore(user: string, name: string): Promise<any> {
//   const parsedUser = user.toLowerCase();
//   const parsedName = name.toLowerCase();
//   try {
//     const response = await fetch(`${baseUrl}/${parsedUser}/chores/assign/${parsedName}`, {
//       method: "PUT",
//     });
//     const data = await response.json();
//     console.log('assign chore data: ', data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     console.log('Error assigning chore');
//   }
// }

// export async function unassignChore(user: string, name: string): Promise<any> {
//   const parsedUser = user.toLowerCase();
//   const parsedName = name.toLowerCase();
//   try {
//     const response = await fetch(`${baseUrl}/${parsedUser}/chores/unassign/${parsedName}`, {
//       method: "PUT",
//     });
//     const data = await response.json();
//     console.log('unassign chore data: ', data);
//     return data;
//   } catch (error) {
//     console.log(error);
//     console.log('Error assigning chore');
//   }
// }

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