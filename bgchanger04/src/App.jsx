import { useState } from 'react'
import './App.css'
import BgChangeBtn from './components/BgChangeBtn'

function App() {

  const [color, setColor] = useState("olive");

  return (
    <div className='w-full h-screen duration-200' style={{backgroundColor : color}}>

      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>test</div>
 
      {/* <div className='bg-gray-300 p-4'>
        <BgChangeBtn btnName='Green' btnColour='bg-green-500'/>
        <BgChangeBtn btnName='Blue' btnColour='bg-blue-500'/>
      </div> */}
    </div>
  )
}

export default App
