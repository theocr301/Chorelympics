import './App.css'
import LandingPage from './Components/LandingPage/LandingPage';

export default function App() {
  const [tab, setTab] = useState('LandingPage');

  return (
    <>
      <div className="body-container">
        <LandingPage />
      </div>
    </>
  )
}

