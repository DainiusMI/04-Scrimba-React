import React from "react";

export default function GameContainer(props) {
    console.log(props.isHeld)
    return (
        <div 
            className="die"
            style={{backgroundColor: props.isHeld ? "#59E391" : "#FFF"}}
        >{props.value}</div>
    )
}