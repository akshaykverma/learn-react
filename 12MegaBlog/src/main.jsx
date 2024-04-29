import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store/store.js'
import PostPage from './pages/PostPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import AllPostsPage from './pages/AllPostsPage.jsx'
import AddPostPage from './pages/AddPostPage.jsx'
import EditPostPage from './pages/EditPostPage.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthProtectedLayout from './components/AuthProtectedLayout.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/login",
            element: (
                <AuthProtectedLayout authentication={false}>
                    <LoginPage />
                </AuthProtectedLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthProtectedLayout authentication={false}>
                    <SignupPage />
                </AuthProtectedLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthProtectedLayout authentication>
                    {" "}
                    <AllPostsPage />
                </AuthProtectedLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthProtectedLayout authentication>
                    {" "}
                    <AddPostPage />
                </AuthProtectedLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthProtectedLayout authentication>
                    {" "}
                    <EditPostPage />
                </AuthProtectedLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <PostPage />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
