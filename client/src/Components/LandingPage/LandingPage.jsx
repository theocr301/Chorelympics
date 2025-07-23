import { useState } from 'react';
import { generateUser } from '../../Services/APIClient';


export default function LandingPage() {
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');

  /*
  useEffect(() => {
    getAllChores().then(setChoreList);
  }, []);
  */

  async function handleSubmit(event) {
    event.preventDefault();
    const newUser = await generateUser(userName);
    setUser(newUser);
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
