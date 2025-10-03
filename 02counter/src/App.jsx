import { useState } from 'react'
import './App.css'

function App() {
  // useState Hook: Returns [stateValue, setterFunction]
  // Initial state is 15, counter holds current value, setCounter updates it
  let [counter, setCounter] = useState(15);

  const addValue = () => {
    // Direct mutation won't work in React - state is immutable
    // counter = counter + 1; // ❌ This won't trigger re-render
    
    // Boundary check to prevent counter going above 20
    if (counter < 20) {   
      // Using functional update pattern for multiple state updates
      // Each setCounter gets the most recent state value
      setCounter(prevCounter => prevCounter + 1); // +1
      setCounter(prevCounter => prevCounter + 1); // +2 
      setCounter(prevCounter => prevCounter + 1); // +3 total
      
      // Note: Without functional updates, all three would use same counter value
      // setCounter(counter + 1); // Would only increment by 1, not 3
    }
  }

  const decreaseValue = () => {
    // Boundary check to prevent negative values
    if (counter > 0) {   
      // Direct state reference is fine for single update
      setCounter(counter - 1);
    }
  }

  return (
    <>
      {/* React Fragment (<>) - renders children without extra DOM node */}
      <h1>Chai aur React</h1>
      
      {/* JSX Expression: {} allows JavaScript inside JSX */}
      <h2>Counter value : {counter}</h2>

      {/* Event Handler: onClick expects a function reference, not a call */}
      <button onClick={addValue}>
        Add Value {counter} {/* Dynamic content - updates on state change */}
      </button>
      <br />
      
      <button onClick={decreaseValue}>
        Decrease Value {counter}
      </button>
    </>
  )
}

export default App
