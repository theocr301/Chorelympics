import './UserItem.css';

export default function UserItem({userItem}) {

  return (
    <>
    <div className="individual-user">
      <div className="user-name">
        <div>{userItem.name}</div>
      </div>
      <div className="user-details">
        <div>{userItem.pointReward}</div>
        <div>{userItem.assignedChores}</div>
      </div>
    </div>
    </>
  )
}