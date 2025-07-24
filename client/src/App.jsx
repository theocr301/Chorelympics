import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router';
import ChoreList from './Components/ChoreList/ChoreList';
import { useState } from 'react';
import { getCurrentUser } from './Services/APIClient';

export default function App() {
  const [user, setUser] = useState('');

  return (
    <>
      <div className="body-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage user={user} setUser={setUser}/>} />
            <Route path=":user/chores" element={<ChoreList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

