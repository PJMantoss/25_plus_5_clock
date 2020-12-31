import React from 'react';
import alarm from '../Alarm-Fast-A1.mp3';

function Timer(props){
    return(
        <section id="timer">
            <h2 id="timer-label">{props.interval}</h2>
            <p id="timer-left">{props.time}</p>
            <button id="start_stop" onClick={}></button>
            <button id="reset" onClick={props.reset}></button>
        </section>
    )
}

export default Timer;