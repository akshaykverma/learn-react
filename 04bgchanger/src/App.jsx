import { useState } from 'react'
import './App.css'
import BgChangeBtn from './components/BgChangeBtn'

function App() {

  const [color, setColor] = useState("olive");

  return (
    <div className='w-full h-screen duration-200' style={{ backgroundColor: color }}>

      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap bg-white justify-center gap-3 shadow-lg px-3 py-2 rounded-3xl'>

          <button onClick={() => setColor("red")}
          className='bg-red-500 outline-none px-4 py-1 rounded-full text-white'>Red</button>

          <button onClick={() => setColor("green")}
          className='bg-green-500 outline-none px-4 py-1 rounded-full text-white'>Green</button>

          <button onClick={() => setColor("blue")}
          className='bg-blue-500 outline-none px-4 py-1 rounded-full text-white'>Blue</button>
          
        </div>

      </div>


    </div>
  )
}

export default App
