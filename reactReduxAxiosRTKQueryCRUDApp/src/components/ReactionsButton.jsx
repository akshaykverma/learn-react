import React from 'react'
import { useAddReactionMutation } from '../features/posts/postsSlice';

function ReactionsButton({ post }) {

    const reactionEmoji = {
        thumbsUp: '👍',
        wow: '😮',
        heart: '❤️',
        rocket: '🚀',
        coffee: '☕'
    }

    const [addReaction] = useAddReactionMutation();

  return (
    
    Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
            key={name} 
            type = "button"
            className = "reactionButton"
            onClick={() => {
                
                const newVal = post.reactions[name] + 1;

                addReaction({
                    postId: post.id,
                    reactions: {...post.reactions, [name]: newVal}
                })
            }}
        >
            {emoji} {post.reactions[name]}
        </button>
    ))
  )
}

export default ReactionsButton