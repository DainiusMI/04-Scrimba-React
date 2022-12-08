import { useState } from 'react'
import Die from "./Die"
import './App.css'

export default function App() {


  return (
    <main className='tenzies'>
      <h1 className='title'>Tenzies</h1>
      <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <section className="die-grid">
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
        <Die value="1" />
      </section>
      <button>Roll</button>
    </main>
  )
}


