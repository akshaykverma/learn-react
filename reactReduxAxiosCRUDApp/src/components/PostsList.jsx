import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react'
import { getPostsRequestError, getPostsRequestStatus, selectAllPosts, fetchPosts, selectPostIds } from '../features/posts/postsSlice'; 
import PostsExcerpt from './PostsExcerpt';

function PostsList() {

    //const dispatch = useDispatch();;

    //const postsList = useSelector(selectAllPosts);
    
    const orderedPostIds = useSelector(selectPostIds);
    const postsRequestStatus = useSelector(getPostsRequestStatus);
    const postsRequestError = useSelector(getPostsRequestError);

    //fetch posts are called from the App.jsx (at the time of app refresh)
    // useEffect(() => {
      
    //   if (postsRequestStatus === 'idle') {
    //     dispatch(fetchPosts());
    //   }
    // }, [postsRequestStatus]);
    

    let content;
    if (postsRequestStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postsRequestStatus === 'succeeded') {
        //const orderedPosts = postsList.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
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