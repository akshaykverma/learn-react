import React from 'react'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButton';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from '../features/posts/postsSlice';

// use let for memoization
const PostsExcerpt = ({ postId }) => {

    const post = useSelector(state => selectPostById(state, postId));

    return (
        <article>
            <h2>{post.title}</h2>
            <p className="excerpt">{post.body.substring(0, 75)}...</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`} 
                    className="text-blue-500"
                    style={{ textDecoration: 'none', color: 'blue', }}
                    >
                        View Post
                </Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButtons post={post} />
        </article>
    )
}

// one way to optimize the component is to use memo
//PostsExcerpt = React.memo(PostsExcerpt);

export default PostsExcerpt