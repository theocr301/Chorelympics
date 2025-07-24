import { useEffect, useState } from 'react'
import { getAllUsers } from '../../Services/APIClient.js'
import UserItem from '../UserItem/UserItem.jsx'
import './Leaderboard.css';

export default function Leaderboard() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUserList);
  }, []);

  return (
    <>
      <div id="List">
        <div className="Leaderboard">
          <div>
            {userList.map(userItem => (
              <UserItem key={userItem._id} userItem={userItem} userList={userList} setUserList={setUserList}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
