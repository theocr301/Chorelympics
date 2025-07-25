import { useEffect, useState } from 'react'
import { getAllChores, getCurrentUser, logoutUser } from '../../Services/APIClient.js'
import ChoreItem from '../ChoreItem/ChoreItem.jsx'
import './ChoreList.css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';

export default function ChoreList() {
  const [choreList, setChoreList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useParams();
  const navigate = useNavigate();
  const myProfile = user.charAt(0).toUpperCase() + user.slice(1)

  async function handleLogout() {
    logoutUser(user).then(setCurrentUser);
    navigate(`/`)
  }

  useEffect(() => {
    getAllChores().then(setChoreList);
    getCurrentUser().then(setCurrentUser);
  }, [currentUser]);

  return (
    <>
      <div className="List">
        <div className="UserProfile">
          <div>
            {myProfile}
            <button className="changeUserButton" type="submit" onClick={handleLogout}>Change User</button>
          </div>
          <div>
            
          </div>
        </div>
        <div className="main-wrapper">
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
      </div>
    </>
  )
}
