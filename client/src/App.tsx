import './App.css'
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import ChoreList from './Components/ChoreList/ChoreList';
import { User, Chore } from './types/types';
import { getAllUsers, getCurrentUser, getAllChores  } from './Services/APIClient';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null); //pass down instead of making new props
  const [userList, setUserList] = useState<User[]>([]); //to pass to leaderboard
  const [choreList, setChoreList] = useState<Chore[]>([]);
  
  function normalizeDifficulty(difficulty: string): "easy" | "medium" | "hard" {
    switch (difficulty.toLowerCase()) {
      case "easy": return "easy";
      case "medium": return "medium";
      case "hard": return "hard";
      default: throw new Error("Unknown difficulty");
    }
  }

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await getCurrentUser();
        if (user) setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    
    async function fetchAllUsers() {
      try {
        const users = await getAllUsers();
        if (users) setUserList(users);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAllChores() {
      try {
        const chores = await getAllChores();
        if (chores) {
          const normalizedChores = chores.map((chore) => (
            {...chore, difficulty:normalizeDifficulty(chore.difficulty)}
          ));
          setChoreList(normalizedChores);
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchCurrentUser();
    fetchAllUsers();
    fetchAllChores();
  }, []);
  
  return (
    <div className="body-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage setCurrentUser={setCurrentUser} setUserList={setUserList}/>} />
          <Route path="/chores" element={ 
            currentUser ? ( //conditionally render ChoreList only if currentUser exists
              <ChoreList 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                userList={userList}
                setUserList={setUserList}
                choreList={choreList}
                setChoreList={setChoreList} />
            ) : (
              <div>Loading...</div>
            )
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

