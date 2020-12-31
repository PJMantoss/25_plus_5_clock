import React from 'react';

function IntervalSetting(props){
    const type = props.type;

    return(
        <section>
            <h2 id={`${type}-label`}>{props.type}</h2>

            <div>
                <button id={`${type}-decrement`} onClick={props.handleChange}></button>

                <p id={`${type}-length`}> {props.length} </p>

                <button id={`${type}-increment`} onClick={props.handleChange}></button>
            </div>
        </section>
    )
}

export default IntervalSetting;