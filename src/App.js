import { useState } from 'react';
// import Timer from './components/Timer';
// import IntervalSetting from './components/IntervalSetting';
// import Footer from './components/Footer';
import './App.css';

function App() {
  const [intervals, setIntervals] = useState({});
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [] = useState();

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
    </div>
  );
}

export default App;
