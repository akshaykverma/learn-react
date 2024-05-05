import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '../features/users/usersSlice'
import { useSelector } from 'react-redux'
import { selectAllPosts, selectPostsByUser } from '../features/posts/postsSlice'

function UserPage() {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)));


    // useSelect is called every time a dispatch is made,
    // we are making a dispatch call in Header for count
    // which trigger this evry time.
    // now as we are returning a new array all the time using filter.
    // This enforces the page to rerender every time the count changes.
    // This causes a performance impact
    // We can solve this by using memoizations
    // Warning given in Console as well : Selectors that return a new reference (such as an object or an array) should be memoized: 
    
    // const postsForUser = useSelector(state => {
    //     const allPosts = selectAllPosts(state);
    //     return allPosts.filter(post => post.userId === Number(userId));
    // });

    // here using the memoization to optimize the call not to rerender page again
    // if the same data is passed to the selector.
    const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)));
    
    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link 
                to={`/post/${post.id}`}
                className="text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
                {post.title}
            </Link>
        </li>
    ))

    return (
        <section>
            <h2>Posts List by {user?.name}</h2>

            <ol>{postTitles}</ol>
        </section>
    )
}

export default UserPage