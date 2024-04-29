import { useState } from 'react'
import './App.css'

function App() {
  const [mainValue, setMainValue] = useState(1);
  //const [mulValue, setMulValue] = useState(1);
  
  // This will also work because whenever any state value changes
  // within a component the whole component will re-render / re-mount itself again.
  // means when mainValue changes the whole App() function will be automatically
  // called again updating mulvalue automatically  

  // This is why its recommended to make your component as small as possible
  // and functionality to use mostly javascript  
  let mulValue = mainValue * 5;

  const multiplyByFive = () => {
    //setMulValue(mainValue * 5);
    setMainValue(mainValue + 1);

  }

  return (
    <>
      <h1>Main Value : {mainValue}</h1>
      <button
        onClick={multiplyByFive}
      >CLick to Multiply by 5</button>
      <h2>Multiplied Value : {mulValue}</h2>
    </>
  )
}

export default App
