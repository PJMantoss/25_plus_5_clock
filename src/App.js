import React,{ useState } from 'react';
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

  let intervalTypes = Object.keys(intervals);

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
      const newIntervals = {...intervals};

      if(intervalDirection === 'increment'){
        newIntervals[intervalType]++;
      }else{
        newIntervals[intervalType]--;
      }

      if(newIntervals[intervalType] >= 1 && newIntervals[intervalType] <= 60){
        setIntervals({intervals: newIntervals});
        if(intervalType === 'session'){
          setTime({time: `${leftPad(newIntervals[intervalType])}:00`})
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
    const audio = document.getElementById("beep");
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

        intervals = setInterval(() => {
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

  const pause = () => {
    clearInterval(intervals);
    setIsPaused({ isPaused: true })
    setPausedTime({ pausedTime: time.split(':') })
  }

  const reset = () => {
    clearInterval(intervals);
    audioControl('pause');
    audioControl('rewind');

    setIntervals({
      intervals: {
        break: 5,
        session: 25
      }
    });

    setIsRunning({ isRunning: true });
    setIsPaused({ isPaused: true });
    setPausedTime({ pausedTime: null });
    setTime({ time: '25:00' })
  }

  return (
    <div>
      <h1>25 + 5 Clock</h1>
      {intervalTypes.map(type => <IntervalSetting 
                                      key={type} 
                                      type={type} 
                                      length={intervals[type]} 
                                      handleChange={handleChange} 
                                  />)
      }

      <Timer 
          interval={isRunning ? intervalTypes[1] : intervalTypes[0]} 
          reset={reset} 
          time={time} 
          start={countDown} 
          isPaused={isPaused} 
          pause={pause} 
      />
    </div>
  );
}

export default App;
