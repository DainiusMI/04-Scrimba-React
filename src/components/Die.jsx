import React from "react";


export default function GameContainer(props) {


    const dots = addDots();
    function addDots() {
        const dotIterator = [];
        for (let i = 0; i < props.value; i++) {
            dotIterator.push(i+1);
        }
        return dotIterator
    }
    
    function handleClassName() {
        return props.isHeld ? `dice-face layout-${props.value} active` : `dice-face layout-${props.value}`
    }

    return (
        <div 
            id={props.id}
            className={handleClassName()}
            onClick={props.onClick}>
            {
                dots.map(dot => <span key={dot} className= "dot" /> )
            }
        </div>
    )
}

//            style={{backgroundColor: props.props.isHeld ? "#59E391" : "#FFF"}}