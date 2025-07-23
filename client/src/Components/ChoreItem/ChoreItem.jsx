import './ChoreItem.css';

export default function ChoreItem({choreItem}) {

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
      </div>
    </div>
    </>
  )
}