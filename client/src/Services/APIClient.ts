const baseUrl = 'http://localhost:3000';

interface User {
  name: string;
  pointReward: number;
  assignedChores: string[];
  isCurrent: boolean;
  profilePic: string;
}
interface Chore {
  name: string;
  difficulty: string;
  duration: number;
  isDone: boolean;
  pointReward: number;
  assignee: string;
}

export async function getAllChores(): Promise<Chore[] | undefined> {
  try {
    const response = await fetch(`${baseUrl}/:user/chores`);
    const data: Chore[] = await response.json();
    data.sort((a, b) => a.pointReward - b.pointReward);
    return data;
  } catch (error) {
    console.log('Error fetching chores from the server');
  }
}

export async function generateUser(name: string): Promise<string | undefined> {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify({ name, isCurrent: true}),
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error);
    console.log('Error creating user');
  }
}

export async function getCurrentUser(): Promise<User | undefined> {
  try {
    const response = await fetch(`${baseUrl}/users/current`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    });
    const data: User[] = await response.json();
    return data[0];
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser(user: string): Promise<string | undefined> {
  try {
    const response = await fetch(`${baseUrl}/users/logout/${user}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUsers(): Promise<User[] | undefined> {
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

//TODO need to get :user and :name from other places and find a way to put them as params for request here

export async function assignChore(user: string, name: string): Promise<any> {
  const parsedUser = user.toLowerCase();
  const parsedName = name.toLowerCase();
  try {
    const response = await fetch(`${baseUrl}/${parsedUser}/chores/assign/${parsedName}`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.log('Error assigning chore');
  }
}

export async function unassignChore(user: string, name: string): Promise<any> {
  const parsedUser = user.toLowerCase();
  const parsedName = name.toLowerCase();
  try {
    const response = await fetch(`${baseUrl}/${parsedUser}/chores/unassign/${parsedName}`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.log('Error assigning chore');
  }
}

export async function completeChore(user: string, name: string): Promise<any>{
  const parsedUser = user.toLowerCase();
  const parsedName = name.toLowerCase();
  try {
    const response = await fetch(`${baseUrl}/${parsedUser}/chores/markcomplete/${parsedName}`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.log('Error completing chore');
  }
}

export async function reopenChore(user: string, name: string): Promise<any> {
  const parsedUser = user.toLowerCase();
  const parsedName = name.toLowerCase();
  try {
    const response = await fetch(`${baseUrl}/${parsedUser}/chores/marknotcomplete/${parsedName}`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.log('Error reopening chore');
  }
}

export async function generateChore(user: string, name: string, difficulty: string): Promise<any> {
  const parsedUser = user.toLowerCase();
  const parsedName = name.toLowerCase();
  try {
    const response = await fetch(`${baseUrl}/${parsedUser}/chores`, {
      method: "POST",
      body: JSON.stringify({ "name": parsedName, "difficulty": difficulty }),
      headers: { "Content-type": "application/json" }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    console.log('Error creating chore');
  }
}