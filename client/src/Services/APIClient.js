const baseUrl = 'http://localhost:3000';

export async function getAllChores() {
  try {
    const response = await fetch(`${baseUrl}/:user/chores`);
    const data = await response.json();
    data.sort((a, b) => a.pointReward - b.pointReward);
    return data;
  } catch (error) {
    console.log('Error fetching chores from the server');
  }
}

export async function generateUser(name) {
  try {
    const response = await fetch(`${baseUrl}/users`, {
      method: "POST",
      body: JSON.stringify({
        "name": `${name}`,
        "isCurrent": true
    }),
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.log(error);
    console.log('Error creating user');
  }
}

export async function getCurrentUser() {
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

//TODO need to get :user and :name from other places and find a way to put them as params for request here

export async function assignChore(user, name) {
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

export async function unassignChore(user, name) {
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