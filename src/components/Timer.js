import React from 'react';
import alarmMp3 from '../Alarm-Fast-A1.mp3';

function Timer(props){
    return(
        <section id="timer">
            <h2 id="timer-label">{props.interval}</h2>
            <p id="timer-left">{props.time}</p>
            <button 
                id="start_stop" 
                onClick={props.isPaused ? props.start : props.pause}
            >
                &#9199;
            </button>
            <button id="reset" onClick={props.reset}> &#8634; </button>
            <audio src={`${alarmMp3}`} id="beep" type="audio/mpeg"></audio>
        </section>
    )
}

export default Timer;