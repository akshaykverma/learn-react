import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
 
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();


  // on the component load check if the user is logged in or not
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        //console.log(userData);
        dispatch(login(userData));
      }
      else {
        dispatch(logout());
      }
    })
    // finally will always be called at the end even if there is any error
    .finally(() => setLoading(false))
  }, [])
  

  // means if not loading execute as normal flow
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
          <main>
            <Outlet />
          </main>
        <Footer />
      </div>
    </div>
    // this can be the case if loading is still happening can add loading icon
  ) : null 
  // <div className="loader">
  //   <div className="loader-wheel"></div>
  //   <div className="loader-text"></div>
  // </div> 
}

export default App
