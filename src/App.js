import React,{ Component } from 'react';
import Timer from './components/Timer';
import IntervalSetting from './components/IntervalSetting';
// import Footer from './components/Footer';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      intervals: {
        break: 5,
        session: 25
      },
      isRunning: true,
      isPaused: true,
      pausedTime: null,
      time: '25:00',
    }
    this.intervalTypes = Object.keys(this.state.intervals)
  }

   leftPad = value => {
    if(value > 9){
      return value + '';
    } else {
      return '0' + value;
    }
  }

    handleChange = e => {
      const buttonElementId = e.target.id;
      const [intervalType, intervalDirection] = buttonElementId.split('-');
      const intervals = {...this.state.intervals};

      if(intervalDirection === 'increment'){
        intervals[intervalType]++;
      }else{
        intervals[intervalType]--;
      }

      if(intervals[intervalType] >= 1 && intervals[intervalType] <= 60){
        this.setState({intervals});
        if(intervalType === 'session'){
          this.setState({time: `${this.leftPad(intervals[intervalType])}:00`})
        }
      }
  }

  getMinutes = () => {
    if(this.state.pausedTime !== null){
      return parseInt(this.state.pausedTime[0]);
    }else if(this.state.isRunning){
      return this.state.intervals.session;
    } else {
      return this.state.intervals.break;
    }
  }

  getSeconds = () => {
    if(this.state.pausedTime !== null){
      return parseInt(this.state.pausedTime[1])
    } else {
      return 0;
    }
  }

  audioControl = action => {
    const audio = document.getElementById("beep");
    if(action === 'rewind'){
      audio.currentTime = 0;
    } else{
      audio[action]();
    }
  }

  countDown = () => {
    this.setState({isPaused: false});
    let minutes = this.getMinutes(),
        seconds = this.getSeconds();

        this.interval = setInterval(() => {
          seconds--;
          if(seconds < 0){
            if(minutes > 0){
              seconds = 59;
              minutes--;
            } else {
              this.setState({isRunning: !this.state.isRunning});
              this.audioControl('play');
              minutes = this.getMinutes();
              seconds = this.getSeconds();
            }
          }
          this.setState({time: `${this.leftPad(minutes)}:${this.leftPad(seconds)}`})
        }, 1000);
  }

  pause = () => {
    clearInterval(this.interval);
    this.setState({isPaused: true, pausedTime: this.state.time.split(':')})
  }

  reset = () => {
    clearInterval(this.interval);
    this.audioControl('pause');
    this.audioControl('rewind');

    this.setState({
      intervals: {
        break: 5,
        session: 25
      },
      isRunning: true,
      isPaused: true,
      pausedTime: null,
      time: '25:00'
    });
  }

  render(){
    return (
      <div>
        <h1>25 + 5 Clock</h1>
        {this.intervalTypes.map(type => <IntervalSetting 
                                        key={type} 
                                        type={type} 
                                        length={this.state.intervals[type]} 
                                        handleChange={this.handleChange} 
                                    />)
        }
  
        <Timer 
            interval={this.state.isRunning ? this.intervalTypes[1] : this.intervalTypes[0]} 
            reset={this.reset} 
            time={this.state.time} 
            start={this.countDown} 
            isPaused={this.state.isPaused} 
            pause={this.pause} 
        />
      </div>
    );
  }
}

export default App;
