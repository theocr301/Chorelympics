import './ChoreList.css';
import spongyImage from '../../assets/Spongy.png';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AddNewChore from '../AddNewChore/AddNewChore';
import ChoreItem from '../ChoreItem/ChoreItem'
import Leaderboard from '../Leaderboard/Leaderboard';
import { Chore, ChoreListProps } from '../../types/types';
import { logoutUser } from '../../Services/APIClient'

export default function ChoreList({ currentUser, setCurrentUser, userList, setUserList, choreList, setChoreList }: ChoreListProps) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const [unassignedChores, setUnassignedChores] = useState<Chore[]>([]);
  const [assignedChores, setAssignedChores] = useState<Chore[]>([]);
  const [doneChores, setDoneChores] = useState<Chore[]>([]);

  async function handleLogout() {
    if (currentUser) {
      await logoutUser();
    }
    setCurrentUser(null);
    navigate(`/`)
  }

  function handleNewChore() {
    setShowForm((prev) => !prev);
  }

  useEffect(() => {
    const unassigned = choreList.filter(
      (chore) => !chore.assignee && !chore.isDone
    );
    const assigned = choreList.filter(
    (chore) =>
      chore.assignee &&
      !chore.isDone &&
      (
        (typeof chore.assignee === 'object' && 'name' in chore.assignee && chore.assignee._id.toString() === currentUser._id.toString())
        || (chore.assignee === currentUser._id)
      )
  );
    const done = choreList.filter(
      (chore) => chore.isDone
    );
    setAssignedChores(assigned);
    setUnassignedChores(unassigned);
    setDoneChores(done);
  }, [choreList, currentUser]);

  return (
    <>
      <div className="List">
        <div className="UserProfile">
          <div className="MyProfile">
            <div className="profile-info">
              <div className="user-avatar">
                <img src={`/${currentUser.profilePic ?? 'Avatar.svg'}`}></img>
              </div>
              <div className="user-name">
                {currentUser.name}
              </div>
            </div>
            <button className="changeUserButton" type="submit" onClick={handleLogout}>CHANGE USER</button>
          </div>
          <div className="MyPoints">
            <div className="Coin">
              <div className="InnerCoin"></div>
            </div>
            <span className="point-value">{currentUser.pointReward ?? 0}</span>
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
                  <AddNewChore
                    onClose={() => setShowForm(false)}
                    currentUser={currentUser}
                    setChoreList={setChoreList}
                  />
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
                <ChoreItem 
                  key={choreItem._id.toString()} 
                  choreItem={choreItem} 
                  currentUser={currentUser} 
                  setChoreList={setChoreList}
                  setUserList={setUserList} />
              ))}
            </div>
            <div className="AssignedChores">
              <div className="chore-header">
                <div className="assigned-circle"></div>
                To Do ({assignedChores.length})</div>
              {assignedChores.map(choreItem => (
                <ChoreItem 
                  key={choreItem._id.toString()} 
                  choreItem={choreItem} 
                  currentUser={currentUser} 
                  setChoreList={setChoreList}
                  setUserList={setUserList} />
              ))}
            </div>
            <div className="CompletedChores">
              <div className="chore-header">
                <div className="completed-circle"></div>
                Done ({doneChores.length})</div>
              {doneChores.map(choreItem => (
                <ChoreItem 
                  key={choreItem._id.toString()} 
                  choreItem={choreItem} 
                  currentUser={currentUser} 
                  setChoreList={setChoreList}
                  setUserList={setUserList} />
              ))}
            </div>
            </div>
          </div>
          <div className="Leaderboard-container">
            <div className="leaderboardly">Leaderboard</div>
            <Leaderboard userList={userList}/>
          </div>
        </div>
      </div>
    </>
  )
}