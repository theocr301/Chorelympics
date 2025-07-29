import { useEffect, useState } from 'react'
import { getAllChores, getCurrentUser, logoutUser } from '../../Services/APIClient.js'
import ChoreItem from '../ChoreItem/ChoreItem.jsx'
import './ChoreList.css';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';
import AddNewChore from '../AddNewChore/AddNewChore.jsx';
import spongyImage from '../../assets/Spongy.png';

export default function ChoreList() {
  const [choreList, setChoreList] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useParams();
  const navigate = useNavigate();
  const myProfile = user.charAt(0).toUpperCase() + user.slice(1);
  const [showForm, setShowForm] = useState(false);
  const unassignedChores = choreList.filter(choreItem => choreItem.assignee === 'Unassigned' && choreItem.isDone === false);
  const myAssignedChores = choreList.filter(choreItem => choreItem.assignee !== 'Unassigned' && choreItem.isDone === false);
  const myCompletedChores = choreList.filter(choreItem => choreItem.isDone === true);

  async function handleLogout() {
    logoutUser(user).then(setCurrentUser);
    navigate(`/`)
  }

  async function handleNewChore() {
    setShowForm(previous => !previous);
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
            <div className="Coin">
              <div className="InnerCoin"></div>
            </div>
            <span className="point-value">{currentUser.pointReward}</span>
          </div>
        </div>
        <img src={spongyImage} className="mascot"></img>
        <div className="main-wrapper">
          <div className="ChoreList">
            <div className="chorelist-header">
            <div className="chorely">Chores</div>
            <button className="create-chore-button" onClick={handleNewChore}>ADD NEW CHORE</button>
            <div className="chore-form-container">
              {showForm && (
                <>
                  <div className="dim-overlay"></div>
                  <div className="chore-form-float">
                    <AddNewChore onClose={() => setShowForm(false)} user={user}/>
                  </div>
                </>
              )}
            </div>
            </div>
            <div className="chorelist-body">

            <div className="UnassignedChores">
              <div className="chore-header">
                <div className="unassigned-circle"></div>
                Unassigned ({unassignedChores.length})</div>
              {unassignedChores.map(choreItem => (
                <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
              ))}
            </div>
            <div className="AssignedChores">
              <div className="chore-header">
                <div className="assigned-circle"></div>
                To Do ({myAssignedChores.length})</div>
              {myAssignedChores.map(choreItem => (
                <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
              ))}
            </div>
            <div className="CompletedChores">
              <div className="chore-header">
                <div className="completed-circle"></div>
                Done ({myCompletedChores.length})</div>
              {myCompletedChores.map(choreItem => (
                <ChoreItem key={choreItem._id} choreItem={choreItem} user={user} setChoreList={setChoreList}/>
              ))}
            </div>
            </div>
          </div>
          <div className="Leaderboard-container">
            <div className="leaderboardly">Leaderboard</div>
            <Leaderboard />
          </div>
        </div>
      </div>
    </>
  )
}
