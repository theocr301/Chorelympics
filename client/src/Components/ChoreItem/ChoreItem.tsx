import './ChoreItem.css';
import { changeAssignment, getAllUsers, toggleIsDone, getAllChores } from '../../Services/APIClient.js';
import { Chore, ChoreItemProps } from '../../types/types';
import { Types } from 'mongoose';

const difficultyImages = {
  easy: '/Easy.svg',
  medium: '/Medium.svg',
  hard: '/Hard.svg',
};

export default function ChoreItem({ choreItem, currentUser, setChoreList, setUserList }: ChoreItemProps) {
  
  async function assignUnassignHelper (userId: Types.ObjectId, choreId: Types.ObjectId, assigningBool: boolean) {
    const choreToAssign: Chore = await changeAssignment(userId, choreId, assigningBool);
    if (choreToAssign) {
      const allChores = await getAllChores();
      console.log('allchores in assignunassign helper: ',allChores);
      if (allChores) setChoreList(allChores);
      // setChoreList(prev => 
      //   prev.map(chore => 
      //     chore._id.toString() === choreToAssign._id.toString() ? choreToAssign : chore
      //   )
      // );
      const updatedUsers = await getAllUsers();
      if (updatedUsers) setUserList(updatedUsers);
    }
  }

  async function handleAssign (event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    if (!currentUser || !choreItem) return;
    try {
      await assignUnassignHelper(currentUser._id, choreItem._id, true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUnassign (event:React.MouseEvent<HTMLButtonElement>): Promise<void> {
    try {
      await assignUnassignHelper(currentUser._id, choreItem._id, false);
    } catch (error) {
      console.log(error);
    }
  }

  async function markDoneHelper (choreId: Types.ObjectId) {
    const choreToToggle: Chore = await toggleIsDone(choreId);
    if (choreToToggle) {
      setChoreList(prev => 
        prev.map(chore => 
          chore._id.toString() === choreToToggle._id.toString() ? choreToToggle : chore
        )
      );
      const updatedUser = await getAllUsers();
      if (updatedUser) setUserList(updatedUser);
    }
  }

  async function handleMarkAsDone (event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    try {
      await markDoneHelper(choreItem._id);
    } catch (error) {
      console.log(error);
    }
  }
  // async function handleMarkAsDone(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
  //   const completed = await completeChore(currentUser.name, choreItem.name);
  //   setChoreList(oldChoreList => {
  //     const updatedChoreList = [];
  //     for (let i = 0; i < oldChoreList.length; i++) {
  //       if (oldChoreList[i].name === completed.updatedChore.name) {
  //         updatedChoreList[i] = completed.updatedChore
  //       } else {
  //         updatedChoreList[i] = oldChoreList[i]
  //       }
  //     }
  //     return updatedChoreList;
  //   });
  //   const updatedUsers = await getAllUsers();
  //   if (updatedUsers) setUserList(updatedUsers);
  // };
            
  async function handleMarkAsNotDone (event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    try {
      await markDoneHelper(choreItem._id);
    } catch (error) {
      console.log(error);
    }
  }
  // async function handleMarkAsNotDone(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
  //   const reopened = await reopenChore(currentUser.name, choreItem.name);
  //   setChoreList(oldChoreList => {
  //     const updatedChoreList = [];
  //     for (let i = 0; i < oldChoreList.length; i++) {
  //       if (oldChoreList[i].name === reopened.updatedChore.name) {
  //         updatedChoreList[i] = reopened.updatedChore
  //       } else {
  //         updatedChoreList[i] = oldChoreList[i]
  //       }
  //     }
  //     return updatedChoreList;
  //   });
  //   const updatedUsers = await getAllUsers();
  //   if (updatedUsers) setUserList(updatedUsers);
  // };

  return (
    <>
    <div className="individual-chore">
      <div className="chore-name">
        <div>{choreItem.name}</div>
        <div>{typeof choreItem.assignee === 'object' && choreItem.assignee !== null && 'name' in choreItem.assignee
          ? choreItem.assignee.name
          : 'Unassigned'}
        </div>
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
        {(choreItem.assignee === null && !choreItem.isDone) && (
          <button className="choreButtonAssign" onClick={handleAssign}>ASSIGN TO ME</button>

        )}
        {(choreItem.assignee !== null && !choreItem.isDone) && (
          <>
            <button className="choreButtonUnassign" onClick={handleUnassign}>UNASSIGN</button>
            <button className="choreButtonComplete" onClick={handleMarkAsDone}>MARK AS DONE</button>
          </>
        )}
        {choreItem.isDone && (
          <button className="choreButtonReopen" onClick={handleMarkAsNotDone}>REOPEN</button>
        )}
      </div>
    </div>
    </>
  )
}
