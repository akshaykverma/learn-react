import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { fetchUsers } from './features/users/usersSlice.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchPosts } from './features/posts/postsSlice.js'


// fetching all posts at the start of the application
// this will help to fetch post for a single post page even if we refresh the page.
// Currently this will not work because we are using a fake json API and the id is generated randomly 
// on each refresh
store.dispatch(fetchPosts());

// fetching all users / authors at the start of the application
store.dispatch(fetchUsers());



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
)
