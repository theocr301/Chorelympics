import { useEffect, useState } from 'react'
import { getAllChores, getCurrentUser, logoutUser } from '../../Services/APIClient'
import ChoreItem from '../ChoreItem/ChoreItem'
import { useParams } from 'react-router';
import Leaderboard from '../Leaderboard/Leaderboard';
import AddNewChore from '../AddNewChore/AddNewChore';
import spongyImage from '../../assets/Spongy.png';
import { useNavigate } from 'react-router-dom';
import { Chore } from '../../types/chore';

import './ChoreList.css';

interface User {
  name: string;
  pointReward: number;
  assignedChores: string[];
  isCurrent: boolean;
  profilePic: string;
}

export default function ChoreList() {
  const [choreList, setChoreList] = useState<Chore[]>([]);
  const [choreName, setChoreName] = useState<string>('');
const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { user } = useParams<{ user?: string }>();
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
    if (user) {
      await logoutUser(user);
    }
    setCurrentUser(null);
    navigate(`/`)
  }

  function handleNewChore() {
    setShowForm((prev) => !prev);
  }

  function normalizeDifficulty(difficulty: string): "easy" | "medium" | "hard" {
    switch (difficulty.toLowerCase()) {
      case "easy": return "easy";
      case "medium": return "medium";
      case "hard": return "hard";
      default: throw new Error("Unknown difficulty");
    }
  }

  useEffect(() => {
    getAllChores().then((chores) => {
      if (chores) {
        const transformedChores = chores.map((chore) => ({
          ...chore,
          difficulty: normalizeDifficulty(chore.difficulty),
        }));
        setChoreList(transformedChores);
      }
    });
    getCurrentUser().then((user) => {
      if (user) setCurrentUser(user);
    });
  }, []);

  return (
    <>
      <div className="List">
        <div className="UserProfile">
          <div className="MyProfile">
            <div className="profile-info">
              <div className="user-avatar">
                <img src={`/${currentUser?.profilePic ?? 'Avatar.svg'}`}></img>
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
            <span className="point-value">{currentUser?.pointReward ?? 0}</span>
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
                    user={user}
                    choreList={choreList}
                    setChoreList={setChoreList}
                    choreName={choreName}
                    setChoreName={setChoreName}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                    assignee="Unassigned"
                    isDone={false}
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