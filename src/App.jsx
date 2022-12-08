import { useState } from 'react'
import Die from "./Die"
import './App.css'


export default function App() {

  const [diceArr, setDiceArr] = useState(rollDice());
  const [gameState, setGameState] = useState("Roll")

  function rollDice() {
    const result = []

    for (let i = 0; i < 10; i++) {
      result.push({
        id: i,
        value: Math.floor(Math.random() * 6 + 1 ),
        isHeld: false
      })
    }
    return result
  }

  return (
    <main className='tenzies'>
      <h1 className='title'>Tenzies</h1>
      <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <section className="die-grid">
        {
          diceArr.map((die, idx) => {
            return <Die
              key={idx} 
              id={idx} 
              value={die.value}
              isHeld={die.isHeld}
            />
          })
        }
      </section>
      <button onClick={()=>{setDiceArr(rollDice())}}>{gameState}</button>
    </main>
  )
}


