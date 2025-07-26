import { useState } from 'react';
import { generateUser } from '../../Services/APIClient';
import { useNavigate } from 'react-router';
import './LandingPage.css';
import spongyImage from '../../assets/Spongy.png';

export default function LandingPage({setUser}) {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const newUser = await generateUser(userName);
    setUser(newUser);
    const pathingHelper = userName.toLowerCase();
    navigate(`/${pathingHelper}/chores`)
    setUserName('')
  };

  function handleNameChange (event) {
    const userName = event.target.value;
    setUserName(userName);
  };

  return (
    <>
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
