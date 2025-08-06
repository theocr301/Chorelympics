import './ChoreItem.css';
import { assignChore, completeChore, unassignChore, reopenChore, getAllUsers } from '../../Services/APIClient.js';
import { ChoreItemProps } from '../../types/chore';
import { ChoreItemUserProp } from '../../types/user';

type props = ChoreItemProps & ChoreItemUserProp;

export default function ChoreItem({ choreItem, setChoreList, currentUser, setUserList }: props) {
  const difficultyImages = {
  easy: '/Easy.svg',
  medium: '/Medium.svg',
  hard: '/Hard.svg',
  };

  async function handleAssign(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    const assigned = await assignChore(currentUser.name, choreItem.name);
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
    const updatedUsers = await getAllUsers();
    if (updatedUsers) setUserList(updatedUsers);
  };
  
  async function handleUnassign(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    const unassigned = await unassignChore(currentUser.name, choreItem.name);
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
    const updatedUsers = await getAllUsers();
    if (updatedUsers) setUserList(updatedUsers);
  }
  
  async function handleComplete(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    const completed = await completeChore(currentUser.name, choreItem.name);
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
    const updatedUsers = await getAllUsers();
    if (updatedUsers) setUserList(updatedUsers);
  };
  
  async function handleReopen(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    const reopened = await reopenChore(currentUser.name, choreItem.name);
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
    const updatedUsers = await getAllUsers();
    if (updatedUsers) setUserList(updatedUsers);
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