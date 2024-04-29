import React, { useEffect, useState } from 'react'
import appwrriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPostsPage() {
  
    const [posts, setPosts] = useState([])
  
    useEffect(() => {
      
        appwrriteService.getPosts([])
            .then(resPosts => {

                if (resPosts) {
                    setPosts(resPosts.documents);
                }
            })
    }, [])
    
    return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map(post => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard  {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPostsPage