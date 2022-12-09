import React from "react";
import Dots from "./Dots"

export default function GameContainer(props) {
    const {id, value, isHeld, handleDie} = props;

    const dots = addDots();
    function addDots() {
        const dotIterator = [];
        for (let i = 0; i < value; i++) {
            dotIterator.push(i+1);
        }
        return dotIterator
    }
    
    function handleClassName() {
        return isHeld ? `dice-face layout-${value} active` : `dice-face layout-${value}`
    }

    return (
        <div 
            id={id}
            className={handleClassName()}
            onClick={handleDie}
        >
            {
                dots.map(dot => (
                    <span 
                        key={dot} 
                        className= "dot"
                    />
                ))
            }
        </div>
    )
}

//            style={{backgroundColor: props.isHeld ? "#59E391" : "#FFF"}}