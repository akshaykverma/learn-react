import './App.css'
import Card from './components/Card'
import ThemeBtn from './components/ThemeBtn'
import { ThemeProvider } from './contexts/Theme'
import {useState, useEffect} from 'react'

function App() {

  const [themeMode, setThemeMode] = useState("light")

  // overriding the functionalities for darkTheme
  const darkTheme = () => {
    setThemeMode("dark");
  }

  // overriding the functionalities for lightTheme
  const lightTheme = () => {
    setThemeMode("light");
  }

  // actual change of theme
  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  
  
  return (
    <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
