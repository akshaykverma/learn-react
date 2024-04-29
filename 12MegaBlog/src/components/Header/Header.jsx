import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {

    const authStatus = useSelector(state => state.auth.status);
    const navigate = useNavigate();

    // navigation link data for each item in the ul
    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      }
      ]
    


  return (
    <header className='py-3 shadow bg-gray-500'>
        <Container>
            {/* <h1>asfsfdfd</h1> */}
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo width='70px'/>

                    </Link>
                </div>
                <ul className='flex ml-auto'>
                    {navItems.map(item => 
                       item.active ? (
                        <li key={item.name}>
                            <button onClick={() => navigate(item.slug)}
                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                {item.name}
                            </button>
                        </li>
                       ) : null 
                    )}
                    {/* means if authService is true then only the next statement will work after && */}
                    {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </nav>
        </Container>
    </header>
  )
}

export default Header