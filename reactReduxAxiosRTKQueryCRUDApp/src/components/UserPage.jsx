import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../features/users/usersSlice'
import { useSelector } from 'react-redux'
import { useGetPostsByUserIdQuery } from '../features/posts/postsSlice'


function UserPage() {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)));

    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId);
    
    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        const { ids, entities } = postsForUser
        content = ids.map(id => (
            <li key={id}>
                <Link 
                    to={`/post/${id}`}
                    className="text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >{entities[id].title}</Link>
            </li>
        ))
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>Posts List by {user?.name}</h2>

            <ol>{content}</ol>
        </section>
    )
}

export default UserPage