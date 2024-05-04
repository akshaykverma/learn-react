import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react'
import { getPostsRequestError, getPostsRequestStatus, selectAllPosts, fetchPosts } from '../features/posts/postsSlice'; 
import PostsExcerpt from './PostsExcerpt';

function PostsList() {

    //const dispatch = useDispatch();;

    const postsList = useSelector(selectAllPosts);
    const postsRequestStatus = useSelector(getPostsRequestStatus);
    const postsRequestError = useSelector(getPostsRequestError);

    // useEffect(() => {
      
    //   if (postsRequestStatus === 'idle') {
    //     dispatch(fetchPosts());
    //   }
    // }, [postsRequestStatus]);
    

    let content;
    if (postsRequestStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postsRequestStatus === 'succeeded') {
        const orderedPosts = postsList.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postsRequestStatus === 'failed') {
        content = <p>{postsRequestError}</p>;
    }


  return (
    <section>
        {/* <h2>Posts</h2> */}
        {content}
    </section>
  )
}

export default PostsList