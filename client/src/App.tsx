import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChoreList from './Components/ChoreList/ChoreList';
import { useState } from 'react';

export default function App() {
  const [user, setUser] = useState<string>('');

  return (
    <div className="body-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage setUser={setUser}/>} />
          <Route path="/:user/chores" element={<ChoreList />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

