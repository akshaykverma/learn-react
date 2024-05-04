import React, { useEffect, useState } from 'react'
import appwrriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'

function HomePage() {
  
    const [posts, setPosts] = useState([])
    const [getPostsRequestStatus, setGetPostsRequestStatus] = useState('pending')
    const loginStatus = useSelector(state => state.auth.status);
    
  
    useEffect(() => {
      
        appwrriteService.getPosts()
            .then(resPosts => {
                if (resPosts) {
                    setPosts(resPosts.documents);
                }
                setGetPostsRequestStatus('success');
            })
    }, [])
    
    if (!loginStatus) {
        return <div>Login to read posts</div>
    }
    else if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                {getPostsRequestStatus === 'pending' ? 'Loading...' : 'No Posts available'}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
  
}

export default HomePage