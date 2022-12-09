import React from 'react'
import Die from "./components/Die"
import Score from './components/Score'
import './App.css'
import "./components/dice.css"

import Confetti from 'react-confetti'

export default function App() {

  const [diceArr, setDiceArr] = React.useState(rollDice());

  const [gameState, setGamestate] = React.useState({
    isOver: false, 
    rollCount: 0,
    bestScore: null
  })




  React.useEffect(()=>{
    const allHeld = !diceArr.find(die => die.isHeld === false);
    const allMatch = diceArr.every(die => die.value === diceArr[0].value);

    allHeld && allMatch && setGamestate(prevState => {
      return {
        ...prevState,
        isOver: true
      }
    });
  }, [diceArr])


  function generateNewDice(idx) {
    return {
      id: idx,
      value: Math.floor(Math.random() * 6 + 1 ),
      isHeld: false
    }
  }


  function rollDice() {
    const result = []
    for (let i = 0; i < 10; i++) {
      result.push(generateNewDice(i))
    }
    return result
  }


  function handleGame() {
    if (gameState.isOver) {
      setDiceArr(rollDice);
      setGamestate(prevState => {
        return {
          isOver: false, 
          rollCount: 0,
          bestScore: !prevState.bestScore ? prevState.rollCount :
            prevState.rollCount < prevState.bestScore ? prevState.rollCount : prevState.bestScore
        }
      })
    }
    else {
      setDiceArr(prevDiceArr => prevDiceArr.map(oldDie => {
        return oldDie.isHeld ? oldDie : 
        generateNewDice(oldDie.id)
      }))
      setGamestate(prevState => {
        return {
          ...prevState,
          rollCount: prevState.rollCount + 1
        }
      })
    }
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
      <button onClick={handleGame}>{ gameState.isOver ? "New game" : "Roll" }</button>

      <Score 
        counter={gameState.rollCount}
        bestScore={gameState.bestScore}
      />

      {gameState.isOver && <Confetti />}
    </main>
  )
}


