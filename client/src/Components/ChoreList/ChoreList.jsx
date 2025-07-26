import { useEffect, useState } from 'react'
import { getAllChores, getCurrentUser, logoutUser } from '../../Services/APIClient.js'
import ChoreItem from '../ChoreItem/ChoreItem.jsx'
import './ChoreList.css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';

export default function ChoreList() {
  const [choreList, setChoreList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
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
          <div className="MyProfile">
            <div className="profile-info">
              <div className="user-avatar">
                <img src={`/${currentUser.profilePic}`}></img>
              </div>
              <div className="user-name">
                {myProfile}
              </div>
            </div>
            <button className="changeUserButton" type="submit" onClick={handleLogout}>CHANGE USER</button>
          </div>
          <div className="MyPoints">
            <div class="Coin"></div>
            <span class="point-value">{currentUser.pointReward}</span>
          </div>
        </div>
        <div className="main-wrapper">
          <div className="ChoreList">
            <div className="chorelist-header">
            <h3>Chores</h3>
            <button className="create-chore-button">ADD NEW CHORE</button>
            </div>
            <div className="chorelist-body">

            <div className="UnassignedChores">
              <div className="chore-header">Unassigned</div>
              {choreList.filter(choreItem => choreItem.assignee === 'Unassigned' && choreItem.isDone === false).map(choreItem => (
                <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
              ))}
            </div>
            <div className="AssignedChores">
              <div className="chore-header">To Do</div>
              {choreList.filter(choreItem => choreItem.assignee !== 'Unassigned' && choreItem.isDone === false).map(choreItem => (
                <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
              ))}
            </div>
            <div className="CompletedChores">
              <div className="chore-header">Done</div>
              {choreList.filter(choreItem => choreItem.isDone === true).map(choreItem => (
                <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
              ))}
            </div>
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
