import './UserItem.css';

export default function UsereItem({userItem, userList, setUserList}) {

  return (
    <>
    <div className="individual-user">
      <div className="user-name">
        <div>{userItem.name}</div>
      </div>
      <div className="user-details">
        <div>{userItem.difficulty}</div>
        <div>{userItem.duration}</div>
        <div>{userItem.pointReward}</div>
        <div>{userItem.assignee}</div>
      </div>
    </div>
    </>
  )
}