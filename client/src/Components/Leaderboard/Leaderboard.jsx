import { useEffect, useState } from 'react'
import { getAllUsers } from '../../Services/APIClient.js'
import UserItem from '../UserItem/UserItem.jsx'
import './Leaderboard.css';

export default function Leaderboard() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUserList);
  }, [userList]);

  return (
    <>
      <div id="List">
        <div className="Leaderboard">
            {userList.map(userItem => (
              <UserItem key={userItem._id} userItem={userItem}/>
            ))}
        </div>
      </div>
    </>
  )
}
