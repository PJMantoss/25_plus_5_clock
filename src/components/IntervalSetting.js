import React from 'react';

function IntervalSetting(props){
    const type = props.type;

    return(
        <section>
            <h2 id={`${type}-label`}>{props.type}</h2>

            <div>
                <button id={`${type}-decrement`} onClick={props.handleChange}> &#9660; </button>

                <p id={`${type}-length`}> {type.length} </p>

                <button id={`${type}-increment`} onClick={props.handleChange}> &#9650; </button>
            </div>
        </section>
    )
}

export default IntervalSetting;