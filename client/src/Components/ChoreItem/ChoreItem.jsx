import './ChoreItem.css';
import { assignChore, completeChore, unassignChore, reopenChore } from '../../Services/APIClient.js';

export default function ChoreItem({user, choreItem, setChoreList}) {
  const difficultyImages = {
  Easy: '/Easy.svg',
  Medium: '/Medium.svg',
  Hard: '/Hard.svg',
  };

  async function handleAssign(event) {
    const assigned = await assignChore(user, choreItem.name);
    setChoreList(oldChoreList => {
      const updatedChoreList = [];
      for (let i = 0; i < oldChoreList.length; i++) {
        if (oldChoreList[i].name === assigned.updatedChore.name) {
          updatedChoreList[i] = assigned.updatedChore
        } else {
          updatedChoreList[i] = oldChoreList[i]
        }
      }
      return updatedChoreList;
    });
  };

  async function handleUnassign(event) {
    const unassigned = await unassignChore(user, choreItem.name);
    setChoreList(oldChoreList => {
      const updatedChoreList = [];
      for (let i = 0; i < oldChoreList.length; i++) {
        if (oldChoreList[i].name === unassigned.updatedChore.name) {
          updatedChoreList[i] = unassigned.updatedChore
        } else {
          updatedChoreList[i] = oldChoreList[i]
        }
      }
      return updatedChoreList;
    });
  }

  async function handleComplete(event) {
    const completed = await completeChore(user, choreItem.name);
    setChoreList(oldChoreList => {
      const updatedChoreList = [];
      for (let i = 0; i < oldChoreList.length; i++) {
        if (oldChoreList[i].name === completed.updatedChore.name) {
          updatedChoreList[i] = completed.updatedChore
        } else {
          updatedChoreList[i] = oldChoreList[i]
        }
      }
      return updatedChoreList;
    });
  };

  async function handleReopen(event) {
    const reopened = await reopenChore(user, choreItem.name);
    setChoreList(oldChoreList => {
      const updatedChoreList = [];
      for (let i = 0; i < oldChoreList.length; i++) {
        if (oldChoreList[i].name === reopened.updatedChore.name) {
          updatedChoreList[i] = reopened.updatedChore
        } else {
          updatedChoreList[i] = oldChoreList[i]
        }
      }
      return updatedChoreList;
    });
  };

  return (
    <>
    <div className="individual-chore">
      <div className="chore-name">
        <div>{choreItem.name}</div>
        <div>{choreItem.assignee}</div>
      </div>
      <div className="chore-details">
        <div>
          <img
            className="diff-image"
            src={difficultyImages[choreItem.difficulty]}
            alt={choreItem.difficulty}
          />
        </div>
        <div className="chore-Coin"></div>
        <div className="chore-coin-reward">{choreItem.pointReward}</div>
      </div>
      <div className="chore-buttons">
        {choreItem.assignee === "Unassigned" && !choreItem.isDone && (
          <button className="choreButtonAssign" onClick={handleAssign}>ASSIGN TO ME</button>
        )}

        {choreItem.assignee !== "Unassigned" && !choreItem.isDone && (
          <>
            <button className="choreButtonUnassign" onClick={handleUnassign}>UNASSIGN</button>
            <button className="choreButtonComplete" onClick={handleComplete}>MARK AS DONE</button>
          </>
        )}

        {choreItem.isDone && (
          <button className="choreButtonReopen" onClick={handleReopen}>REOPEN</button>
        )}
      </div>
    </div>
    </>
  )
}