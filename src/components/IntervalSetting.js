import React from 'react';

function IntervalSetting(props){
    const type = props.type;

    return(
        <section>
            <h2 id={`${type}-label`}>{props.type}</h2>

            <div>
                <button id={`${type}-decrement`} onClick={}></button>

                <p></p>

                <button id={`${type}-increment`} onClick={}></button>
            </div>
        </section>
    )
}

export default IntervalSetting;