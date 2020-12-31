import { useState } from 'react';
import Timer from './components/Timer';
import IntervalSetting from './components/IntervalSetting';
// import Footer from './components/Footer';
import './App.css';

function App() {
  const [intervals, setIntervals] = useState({});
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [pausedTime, setPausedTime] = useState(null);
  const [time, setTime] = useState('25:00');

  const handleChange = e => {
    const buttonElementId = e.target.id;
    const [intervalType, intervalDirection] = buttonElementId.split('-');
  }

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <IntervalSetting />
      <Timer />
    </div>
  );
}

export default App;
