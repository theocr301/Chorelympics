import './UserItem.css';

export default function UserItem({userItem}) {

  return (
    <>
    <div className="individual-user">
      <div className="user-display">
        <div className="user-avatar">
          <img src={`/${userItem.profilePic}`}></img>
        </div>
        <div className="user">{userItem.name}</div>
      </div>
      <div className="user-details">
        <div>{userItem.pointReward}</div>
      </div>
    </div>
    </>
  )
}

