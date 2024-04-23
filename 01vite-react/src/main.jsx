import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'



// const anotherElement = (
//   <a href="http://google.com">Visite Google</a>
// )

const anotherUser = "user123"

const reactElement = React.createElement(
  'a',
  {
    'href' : 'http://google.com',
    'target' : '_blank'
  },
  'Click me to visit google',
  anotherUser
)



ReactDOM.createRoot(document.getElementById('root')).render(
  
  // anotherElement
  // reactElement
  
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
