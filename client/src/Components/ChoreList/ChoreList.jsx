import { useEffect, useState } from 'react'
import { getAllChores } from '../../Services/APIClient.js'
import ChoreItem from '../ChoreItem/ChoreItem.jsx'
import './ChoreList.css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';

export default function ChoreList() {
  const [choreList, setChoreList] = useState([]);
  const { user } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllChores().then(setChoreList);
  }, []);

  return (
    <>
      <div className="List">
        <div className="UserProfile">
          {user}
          <button className="changeUserButton" type="submit" onClick={() => {navigate(`/`)}}>Change User</button>
        </div>
        <div className="ChoreList">
          <div className="UnassignedChores">
            Open Chores
            {choreList.filter(choreItem => choreItem.assignee === 'Unassigned' && choreItem.isDone === false).map(choreItem => (
              <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
            ))}
          </div>
          <div className="Assigned Chores">
            My Open Chores
            {choreList.filter(choreItem => choreItem.assignee !== 'Unassigned' && choreItem.isDone === false).map(choreItem => (
                <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
            ))}
          </div>
          <div className="Completed Chores">
            Completed Chores
            {choreList.filter(choreItem => choreItem.isDone === true).map(choreItem => (
                <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
            ))}
          </div>
        </div>
        <div className="Leaderboard-container">
          Leaderboard
          <Leaderboard />
        </div>
      </div>
    </>
  )
}
