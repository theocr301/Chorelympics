import './ChoreItem.css';
import { assignChore, unassignChore } from '../../Services/APIClient.js';
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

  return (
    <>
    <div className="individual-chore">
      <div className="chore-name">
        <div>{choreItem.name}</div>
      </div>
      <div className="chore-details">
        <div>{choreItem.difficulty}</div>
        <div>{choreItem.duration}</div>
        <div>{choreItem.pointReward}</div>
        <div>{choreItem.assignee}</div>
        <button className="choreButton" onClick={() => handleAssign()}>Assign</button>
        <button className="choreButton" onClick={() => handleUnassign()}>Unassign</button>
      </div>
    </div>
    </>
  )
}