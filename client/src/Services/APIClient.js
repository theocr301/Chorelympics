const baseUrl = 'http://localhost:3000';

export async function getAllChores() {
  try {
    const response = await fetch(`${baseUrl}/chores`);
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
    }),
      headers: {"Content-Type": "application/json"}
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error creating user');
  }
}