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
  function reRollDice() {
    setDiceArr(prevDiceArr => prevDiceArr.map(oldDie => {
      return oldDie.isHeld ? oldDie : 
      {...oldDie, value: Math.floor(Math.random() * 6 + 1 ),}
    }))
  }
  function holdDie(event) {
    const id = event.target.id
    setDiceArr(prevDiceArr => prevDiceArr.map(die => {
      return die.id == id ? 
        {...die, isHeld: !die.isHeld} : die
    }))
  }
  return (
    <main className='tenzies'>
      <h1 className='title'>Tenzies</h1>
      <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <section className="die-grid">
        {
          diceArr.map(die => {
            return <Die
              key={die.id} 
              id={die.id} 
              value={die.value}
              isHeld={die.isHeld}
              holdDie={holdDie}
              //  holdDice={() => holdDice(die.id)}
            />
          })
        }
      </section>
      <button onClick={reRollDice}>{gameState}</button>
    </main>
  )
}


