import React from 'react'
import Die from "./components/Die"
import Score from './components/Score'
import './App.css'
import "./components/dice.css"

import Confetti from 'react-confetti'

//  selecting dice is bugged seems to trigger the first dice for no reason


export default function App() {

  const [diceArr, setDiceArr] = React.useState(rollDices());

  const [gameState, setGamestate] = React.useState({
    isOver: false, 
    rollCount: 0,
    bestScore: JSON.parse(localStorage.getItem("tenzies")) || 0
  })

  React.useEffect(()=>{
    const allHeld = diceArr.every(die => die.isHeld === true);
    const allMatch = diceArr.every(die => die.value == diceArr[0].value);

    allHeld && allMatch && setGamestate(prevState => {
      return {
        isOver: true,
        rollCount: prevState.rollCount,
        bestScore: !prevState.bestScore ? prevState.rollCount :
        prevState.bestScore < prevState.rollCount ? prevState.bestScore : prevState.rollCount
      }
    });
    gameState.isOver && console.log("game is over: " + gameState.bestScore + " from useEffect")
  }, [diceArr])

  React.useEffect(() => {
    localStorage.setItem("tenzies", JSON.stringify(gameState.bestScore))
  }, [gameState.bestScore])

  function newDices(idx) {
    return {
      id: idx,
      value: Math.floor(Math.random() * 6 + 1 ),
      isHeld: false
    }
  }


  function rollDices() {
    const result = []
    for (let i = 0; i < 10; i++) {
      result.push(newDices(i))
    }
    return result
  }


  function handleGame() {
    // if you have won the game
    if (gameState.isOver) {
      setGamestate(prevState => {
        return {
          ...prevState,
          isOver: false, 
          rollCount: 0
        }
      })
      setDiceArr(rollDices());
      console.log(diceArr)
    }
    else {
      setDiceArr(prevDiceArr => prevDiceArr.map(oldDie => {
        return oldDie.isHeld ? oldDie : 
        newDices(oldDie.id)
      }))
      setGamestate(prevState => {
        return {
          ...prevState,
          rollCount: prevState.rollCount + 1
        }
      })
    }
  }
  
  function toggleDice(id) {
    setDiceArr(prevDiceArr => prevDiceArr.map(dice => {
      return dice.id === id ? 
        {...dice, isHeld: !dice.isHeld} : dice
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
              onClick={() => toggleDice(die.id)}
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


