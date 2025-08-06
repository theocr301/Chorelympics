import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChoreList from './Components/ChoreList/ChoreList';
import { useState, useEffect } from 'react';
import { User } from './types/user';
import { getAllUsers, getCurrentUser  } from './Services/APIClient';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null); //pass down instead of making new props
  const [userList, setUserList] = useState<User[]>([]); //to pass to leaderboard
  
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
    
    fetchCurrentUser();
    fetchAllUsers();
  }, []);

  return (
    <div className="body-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage setCurrentUser={setCurrentUser} setUserList={setUserList}/>} />
          <Route path="/:user/chores" element={ 
            currentUser ? ( //conditionally render ChoreList only if currentUser exists
              <ChoreList 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                userList={userList}
                setUserList={setUserList} />
            ) : (
              <div>Loading...</div>
            )
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

