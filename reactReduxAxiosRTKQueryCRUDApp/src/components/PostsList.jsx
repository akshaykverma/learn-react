import { useSelector } from 'react-redux';
import React from 'react'
import { selectPostIds, useGetPostsQuery } from '../features/posts/postsSlice'; 
import PostsExcerpt from './PostsExcerpt';

function PostsList() {
    
    const {
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery()

    const orderedPostIds = useSelector(selectPostIds);

    console.log(orderedPostIds);

    let content;
    if (isLoading) {
        console.log('Loading...');
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        //const orderedPosts = postsList.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
    } else if (isError) {
        content = <p>{error}</p>;
    }


  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
  )
}

export default PostsList