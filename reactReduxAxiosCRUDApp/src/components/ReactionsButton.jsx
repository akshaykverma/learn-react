import React from 'react'
import { useDispatch } from 'react-redux'
import { addReaction } from '../features/posts/postsSlice';

function ReactionsButton({ post }) {

    const reactionEmoji = {
        thumbsUp: '👍',
        wow: '😮',
        heart: '❤️',
        rocket: '🚀',
        coffee: '☕'
    }

    const dispatch = useDispatch();

  return (
    
    Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
            key={name} 
            type = "button"
            className = "reactionButton"
            onClick={() => dispatch(addReaction({
                postId : post.id,    
                reaction : name
            }))}
        >
            {emoji} {post.reactions[name]}
        </button>
    ))
  )
}

export default ReactionsButton