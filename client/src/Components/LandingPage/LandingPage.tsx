import { useState, ChangeEvent, FormEvent } from 'react';
import { generateUser } from '../../Services/APIClient';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import spongyImage from '../../assets/Spongy.png';
import baseUrl from '../../Services/baseUrl';

interface User {
  name: string;
  pointReward: number;
  assignedChores: string[];
  isCurrent: boolean;
  profilePic: string;
}

interface LandingPageProps {
  setUser: (user: User) => void;
}

export default function LandingPage({setUser}: LandingPageProps) {
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  async function generateUser(name: string): Promise<User | null> {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify({ name, isCurrent: true }),
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) return null;
      const data: User = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function handleNameChange (event: ChangeEvent<HTMLInputElement>) {
    setUserName(event.target.value);
  };

  return (
    <>
    <div className="chorelympics">CHORELYMPICS</div>
    <div className="spongy-sticker">
      <img src={spongyImage} className="spongy"></img>
      <div className="form-container">
        <span className="nameQuestion">What's your name?</span>
        <form className="submit-form" type="submit" onSubmit={handleSubmit}>
          <input name="nameInput" className="inputBox" value={userName} onChange={handleNameChange} required></input>
          <button className="formButton" type="submit">CONTINUE</button>
        </form>
      </div>
    </div>
    </>
  )
};
