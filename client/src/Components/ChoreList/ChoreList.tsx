import { useEffect, useState } from 'react'
import { getAllChores, getCurrentUser, logoutUser } from '../../Services/APIClient'
import ChoreItem from '../ChoreItem/ChoreItem'
import { useParams } from 'react-router';
import Leaderboard from '../Leaderboard/Leaderboard';
import AddNewChore from '../AddNewChore/AddNewChore';
import spongyImage from './assets/Spongy.png';
import { useNavigate } from 'react-router-dom';


import './ChoreList.css';

interface Chore {
  name: string,
  difficulty: string,
  duration: number,
  isDone: boolean,
  pointReward: number,
  assignee: string,
}
interface User {
  name: string;
  pointReward: number;
  assignedChores: string[];
  isCurrent: boolean;
  profilePic: string;
}

interface RouteParams {
  user: string;
}

export default function ChoreList() {
  const [choreList, setChoreList] = useState<Chore[]>([]);
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const { user } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  if (!user) return null; // Safety check

  const myProfile = user.charAt(0).toUpperCase() + user.slice(1);

  const unassignedChores = choreList.filter(
    (choreItem) => choreItem.assignee === 'Unassigned' && !choreItem.isDone
  );
  const myAssignedChores = choreList.filter(
    (choreItem) => choreItem.assignee !== 'Unassigned' && !choreItem.isDone
  );
  const myCompletedChores = choreList.filter((choreItem) => choreItem.isDone);

  async function handleLogout() {
    await logoutUser(user)
    setCurrentUser({} as User);
    navigate(`/`)
  }

  function handleNewChore() {
    setShowForm((prev) => !prev);
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
