import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  // This hook is basically able to reference a element
  // in this case its a input password 
  // using this we can manipulate the input properties
  const passwordRef = useRef(null)

  const copyGeneratedPasswordToCLipboard = useCallback(() => {
    
    // highlghts the text in the input box
    // ? means the value in current can also be null so it makes it optional
    // to select only when not null
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 5);
    window.navigator.clipboard.writeText(password)

  }, [password])

  // useCallback hook is used to cache values of the dependent variables 
  // that used to call passwordGenerator() multitple times.
  // This is only used for optimizations
  // This will also work without useCallback
  const passwordGenerator = useCallback(() => {
    
    let pass = "";
    
    // used for generating the random string from the below string
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (characterAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    } 

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);

  }, [length, numberAllowed, characterAllowed, setPassword]);

  // this hook is used when any changes happens in the dependent variables
  // also called when the page loads first time
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed])

  return (
    <>
      <div className='w-full max-w-md mx-auto text-orange-500 shadow-md rounded-lg px-4 py-3 my-8 bg-gray-700'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type='text' 
          value={password} 
          className='outline-none w-full py-1 px-3'
          placeholder='Password' 
          readOnly 
          ref={passwordRef}/>
          
          <button
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyGeneratedPasswordToCLipboard}
          >copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked = {numberAllowed}
              id="numberInput"
              onChange={() => {setNumberAllowed((prev) => !prev)}}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked = {characterAllowed}
              id="characterInput"
              onChange={() => {setCharacterAllowed((prev) => !prev)}}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>

      </div>

    </>
  )
}
export default App
