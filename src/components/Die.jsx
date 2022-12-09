import React from "react";

export default function GameContainer(props) {
    return (
        <div 
            id={props.id}
            className={props.isHeld ? "die-face active" : "die-face"}
            onClick={props.handleDie}
        >
                <div className="dot" />
        </div>
    )
}

//            style={{backgroundColor: props.isHeld ? "#59E391" : "#FFF"}}