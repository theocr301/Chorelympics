import { useEffect, useState } from 'react'
import { getAllChores } from '../../Services/APIClient.js'
import ChoreItem from '../ChoreItem/ChoreItem.jsx'
import './ChoreList.css';

export default function ChoreList({choreList, setChoreList}) {

  useEffect(() => {
    getAllChores().then(setChoreList);
  }, []);

  return (
    <>
      <div id="List">
        <div className="ChoreList">
          <div>
            {choreList.map(choreItem => (
              <ChoreItem key={choreItem._id}choreItem={choreItem}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
