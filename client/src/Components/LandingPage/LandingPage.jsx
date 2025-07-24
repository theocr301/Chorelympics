import { useState } from 'react';
import { generateUser } from '../../Services/APIClient';
import { useNavigate } from 'react-router';

export default function LandingPage({user, setUser}) {
  const [userName, setUserName] = useState('');
  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(userName);
    const newUser = await generateUser(userName);
    setUser(newUser);
    const pathingHelper = userName.toLowerCase();
    navigate(`/${pathingHelper}`)
    setUserName('')
  }

  function handleNameChange (event) {
    const name = event.target.value;
    setUserName(name);
  }

  return (
    <>
      <div id="form-container">
        <div>
        What is your name?
        </div>
        <form className="submit-form" type="submit" onSubmit={handleSubmit}>
          <input name="name" value={userName} onChange={handleNameChange} required></input>
          <button className="button" type="submit">Continue</button>
        </form>
      </div>
    </>
  )
}
