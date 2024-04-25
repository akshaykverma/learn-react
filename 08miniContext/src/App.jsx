import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvider from './context/UserContextProvider'
import UserContext from './context/UserContext'
import { useContext } from 'react'

function App() {

  return (


    <UserContextProvider>
      <h1>Context API</h1>
      {/* below are the children components passed in the provider */}
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
