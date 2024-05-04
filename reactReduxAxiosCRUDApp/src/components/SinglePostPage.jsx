import React from 'react'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import { useSelector } from 'react-redux';
import { selectPostById } from '../features/posts/postsSlice';
import { Link, useParams } from 'react-router-dom';
import ReactionsButton from './ReactionsButton';

function SinglePostPage() {
    const { postId } = useParams();

    console.log(postId);

    let post = useSelector((state) => selectPostById(state, postId))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`} style={{ textDecoration: 'none', color: 'blue'}}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionsButton post={post} />
        </article>
    )
}

export default SinglePostPage