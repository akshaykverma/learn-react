import { useState } from 'react'
import './App.css'

function App() {



  let [counter, setCounter] = useState(15);

  const addValue = () => {
    
    //counter = counter + 1; 
    
    if (counter < 20) {   
      setCounter(counter + 1);
      setCounter(counter + 1);
      setCounter(counter + 1);
      setCounter(counter + 1);
      setCounter(counter + 1);
    }

  }

  const decreaseValue = () => {
    //counter = counter + 1; 
    
    if (counter > 0) {   
      setCounter(counter - 1);
    }
  }

  return (
    <>
      <h1>Chai aur React</h1>
      <h2>Counter value : {counter}</h2>

      <button
      onClick={addValue}>Add Value {counter}</button>
      <br />
      <button
      onClick={decreaseValue}>Decrease Value {counter}</button>
    </>
  )
}

export default App
