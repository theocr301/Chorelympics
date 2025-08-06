import { useEffect, useState } from 'react'
import { getAllUsers } from '../../Services/APIClient.js'
import UserItem from '../UserItem/UserItem.jsx'
import './Leaderboard.css';
import { LeaderboardProps } from '../../types/user';

export default function Leaderboard({ userList }: LeaderboardProps) {
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
