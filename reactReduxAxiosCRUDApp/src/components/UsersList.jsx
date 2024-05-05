import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from '../features/users/usersSlice'

function UsersList() {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link 
            to={`/user/${user.id}`}
            className="text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">{user.name}
            </Link>
        </li>
    ))

    return (
        <section>
            <h2>Users</h2>

            <ul>{renderedUsers}</ul>
        </section>
    )
}

export default UsersList