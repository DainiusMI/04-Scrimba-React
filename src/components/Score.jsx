import React from "react";

export default function Score(props) {
    return (
        <section className="score-container">
                <p className="score-text">You have rolled <strong>{props.counter}</strong> times</p>
                {
                props.bestScore ?
                    <p className="score-text">Best logged score was with <strong>{props.bestScore}</strong> rolls</p> :
                    <p className="score-text">There is no best scored logged yet</p>
                }
        </section>
    )
}