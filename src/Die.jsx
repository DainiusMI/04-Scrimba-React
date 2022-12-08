import React from "react";

export default function GameContainer(props) {
    return (
        <div 
            id={props.id}
            className={props.isHeld ? "die active" : "die"}
            onClick={props.holdDie}
        >{props.value}</div>
    )
}

//            style={{backgroundColor: props.isHeld ? "#59E391" : "#FFF"}}