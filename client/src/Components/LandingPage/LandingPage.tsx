import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';
import spongyImage from '../../assets/Spongy.png';
import { LandingPageProps } from '../../types/user';
import { generateUser } from '../../Services/APIClient';

const baseUrl = 'http://localhost:3000';

export default function LandingPage({setCurrentUser, setUserList}: LandingPageProps) {
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = await generateUser(userName);
    console.log('landing page user: ',user);
    if (user) {
      setCurrentUser(user);
      //if user already in list, do not change it, otherwise add user to list
      setUserList(prev => {
        const exists = prev.some(existingUser => existingUser.name === user.name);
        return exists ? prev : [...prev, user];
      })
      navigate(`/${user.name}/chores`);
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
        <form className="submit-form" onSubmit={handleSubmit}>
          <input name="nameInput" className="inputBox" value={userName} onChange={handleNameChange} required></input>
          <button className="formButton" type="submit">CONTINUE</button>
        </form>
      </div>
    </div>
    </>
  )
};
