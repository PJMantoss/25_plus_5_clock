import { useState } from 'react';
import Timer from './components/Timer';
import IntervalSetting from './components/IntervalSetting';
// import Footer from './components/Footer';
import './App.css';

function App() {
  const [intervals, setIntervals] = useState({break: 5, session: 25});
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [pausedTime, setPausedTime] = useState(null);
  const [time, setTime] = useState('25:00');

  //let intervalTypes = Object.keys(intervals);

  const leftPad = value => {
    if(value > 9){
      return value + '';
    } else {
      return '0' + value;
    }
  }

   const handleChange = e => {
      const buttonElementId = e.target.id;
      const [intervalType, intervalDirection] = buttonElementId.split('-');
      const intervals = {...intervals};

      if(intervalDirection === 'increment'){
        intervals[intervalType]++;
      }else{
        intervals[intervalType]--;
      }

      if(intervals[intervalType] >= 1 && intervals[intervalType] <= 60){
        setIntervals({intervals});
        if(intervalType === 'session'){
          setTime({time: `${leftPad(intervals[intervalType])}:00`})
        }
      }
  }

  const getMinutes = () => {
    if(pausedTime !== null){
      return parseInt(pausedTime[0]);
    }else if(isRunning){
      return intervals.session;
    } else {
      return intervals.break;
    }
  }

  const getSeconds = () => {
    if(pausedTime !== null){
      return parseInt(pausedTime[1])
    } else {
      return 0;
    }
  }

  const audioControl = action => {
    const audio = getElementById("beep");
    if(action === 'rewind'){
      audio.currentTime = 0;
    } else{
      audio[action]();
    }
  }

  const countDown = () => {
    setIsPaused({isPaused: false});
    let minutes = getMinutes(),
        seconds = getSeconds();

        interval = setInterval(() => {
          seconds--;
          if(seconds < 0){
            if(minutes > 0){
              seconds = 59;
              minutes--;
            } else {
              setIsRunning({isRunning: !isRunning});
              audioControl('play');
              minutes = getMinutes();
              seconds = getSeconds();
            }
          }
          setTime({time: `${leftPad(minutes)}:${leftPad(seconds)}`})
        }, 1000);
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
