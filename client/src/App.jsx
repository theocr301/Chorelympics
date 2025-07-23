import { useState } from 'react'
import './App.css'
import ChoreList from './Components/ChoreList/ChoreList';

function App() {
  const [choreList, setChoreList] = useState([]);

  return (
    <>
      <div className="body-container">
        <ChoreList choreList={choreList} setChoreList={setChoreList} />
      </div>
    </>
  )
}

export default App
