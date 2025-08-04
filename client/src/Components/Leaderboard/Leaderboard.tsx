import { useEffect, useState } from 'react'
import { getAllUsers } from '../../Services/APIClient.js'
import UserItem from '../UserItem/UserItem.jsx'
import './Leaderboard.css';

import { User } from '../../types/user';

export default function Leaderboard() {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers().then((users) => {
      if (users) {
        setUserList(users);
      }
    });
  }, []);

  return (
    <div id="List">
      <div className="Leaderboard">
        {userList.map(userItem => (
          <UserItem key={userItem.name} userItem={userItem} />
        ))}
      </div>
    </div>
  );
}
