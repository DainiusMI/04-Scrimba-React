import React from 'react'
import Die from "./components/Die"
import './App.css'
import "./components/dice.css"

import Confetti from 'react-confetti'

export default function App() {

  const [diceArr, setDiceArr] = React.useState(rollDice());


  const [tenzie, setTenzie] = React.useState(false)

  React.useEffect(()=>{
    const allHeld = !diceArr.find(die => die.isHeld === false);
    const allMatch = diceArr.every(die => die.value === diceArr[0].value);

    allHeld && allMatch && setTenzie(true);
  }, [diceArr])

  function createNewDie(idx) {
    return {
      id: idx,
      value: Math.floor(Math.random() * 6 + 1 ),
      isHeld: false
    }
  }
  function rollDice() {
    const result = []
    for (let i = 0; i < 10; i++) {
      result.push(createNewDie(i))
    }
    return result
  }
  function handleGame() {
    if (tenzie) {
      setDiceArr(rollDice);
      setTenzie(false)
    }
    else 
    setDiceArr(prevDiceArr => prevDiceArr.map(oldDie => {
      return oldDie.isHeld ? oldDie : 
      createNewDie(oldDie.id)
    }))
  }
  function handleDie(event) {
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
      <section className="dice-grid">
        {
          diceArr.map(die => {
            return <Die
              key={die.id} 
              id={die.id} 
              value={die.value}
              isHeld={die.isHeld}
              handleDie={handleDie}
              //  holdDice={() => holdDice(die.id)}
            />
          })
        }
      </section>
      <button onClick={handleGame}>{ tenzie ? "New game" : "Roll" }</button>
      {tenzie && <Confetti />}
    </main>
  )
}


