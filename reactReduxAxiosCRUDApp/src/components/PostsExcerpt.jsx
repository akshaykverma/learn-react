import React from 'react'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButtons from './ReactionsButton';
import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post }) => {

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
export default PostsExcerpt