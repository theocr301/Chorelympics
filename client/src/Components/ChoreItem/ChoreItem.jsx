import './ChoreItem.css';
import { assignChore, completeChore, unassignChore, reopenChore } from '../../Services/APIClient.js';
import { useState } from 'react';

export default function ChoreItem({user, choreItem, choreList, setChoreList}) {

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
      </div>
      <div className="chore-details">
        <div>Difficulty: {choreItem.difficulty}</div>
        <div>Duration: {choreItem.duration}</div>
        <div>Reward: {choreItem.pointReward}</div>
        <div>Assignee: {choreItem.assignee}</div>
        <button className="choreButtonAssign" onClick={() => handleAssign()}>Assign</button>
        <button className="choreButtonUnassign" onClick={() => handleUnassign()}>Unassign</button>
        <button className="choreButtonComplete" onClick={() => handleComplete()}>Complete</button>
        <button className="choreButtonReopen" onClick={() => handleReopen()}>Reopen</button>
      </div>
    </div>
    </>
  )
}