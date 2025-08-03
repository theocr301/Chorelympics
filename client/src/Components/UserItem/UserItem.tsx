//import { UserProps } from '../../types/user';
import './UserItem.css';
import { User } from '../../types/user';

interface UserItemProps {
  userItem: User;
}

export default function UserItem({userItem}: UserItemProps) {

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

