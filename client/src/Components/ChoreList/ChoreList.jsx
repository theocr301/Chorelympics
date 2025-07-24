import { useEffect, useState } from 'react'
import { getAllChores } from '../../Services/APIClient.js'
import ChoreItem from '../ChoreItem/ChoreItem.jsx'
import './ChoreList.css';
import { useParams } from 'react-router';

export default function ChoreList() {
  const [choreList, setChoreList] = useState([]);
  const { user } = useParams();

  useEffect(() => {
    getAllChores().then(setChoreList);
  }, []);

  return (
    <>
      <div id="List">
        <div className="ChoreList">
          <div>
            {choreList.map(choreItem => (
              <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} choreList={choreList} setChoreList={setChoreList}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
