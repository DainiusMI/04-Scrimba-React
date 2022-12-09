import React from "react";

export default function Dots(props) {
    const {value} = props
    const dots = addDots();
    function addDots() {
        const dotIterator = []
        for (let i = 0; i <= value; i++) {
            dotIterator.push(i+1)
        }
        return dotIterator
    }


    return (
        <div className={`dots-${value}`}>
            {
                dots.map(dot => (
                    <div key={dot} className="dot" />
                ))
            }
        </div>
    )
}