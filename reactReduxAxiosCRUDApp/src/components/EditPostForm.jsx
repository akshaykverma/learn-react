import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { editPost, selectPostById, deletePost } from '../features/posts/postsSlice';
import { useForm } from 'react-hook-form';
import { selectAllUsers } from '../features/users/usersSlice';

function EditPostForm() {

    const { postId } = useParams();

    console.log(postId);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const originalPost = useSelector((state) => selectPostById(state, postId));
    const users = useSelector(selectAllUsers);
    const [editRequestStatus, setEditRequestStatus] = useState('idle');
    
    const {register, handleSubmit, formState: { errors, isValid, isDirty }, reset} = useForm({
        mode: 'onChange', // Validation will trigger on the 'change' event
        defaultValues: {
            // Set initial values for your form fields
            title: originalPost?.title,
            content: originalPost?.body,
            userId: originalPost?.userId
        }
    });

    console.log(originalPost);

    if (!originalPost) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onSavePostClicked = async(postData) => {
        console.log(postData);
        if (editRequestStatus === 'idle') {
            try {
                
                setEditRequestStatus('pending');
 
                // send data to the thunk 
                // unwrap will throw any errors during the API call 
                await dispatch(editPost({
                    id: originalPost.id,
                    body: postData.content,
                    reactions: originalPost.reactions,  
                    ...postData
                })).unwrap();
                
            } catch (error) {
                console.error('Failed to save the post', error);
            }
            finally {
    
                setEditRequestStatus('idle');
                navigate(`/post/${originalPost.id}`);
                //reset all form fields
                reset();
            }
        }
    }

    const onDeletePostClicked = async () => {
        try {
            setEditRequestStatus('pending')
            await dispatch(deletePost({ id: postId })).unwrap();

        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
            setEditRequestStatus('idle');
            reset();
            navigate('/');
        }
    }

    return (
        <div className='flex flex-wrap min-w-[700px] flex-col'>
            <h1 className='text-center my-10 text-3xl'>Edit Post</h1>

            {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
            <form className="flex flex-wrap flex-col content-center" onSubmit={handleSubmit(onSavePostClicked)}>

                <label htmlFor="postTitle">Post Title:</label>
                <input className='w-1/2
                                rounded-md
                                border border-gray-300
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                text-gray-700 '
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    {...register("title", {
                        defaultValue: originalPost.title,
                        required: 'Title is required',
                        minLength: {
                            value: 3,
                            message: 'Title must be at least 3 characters long'
                        },
                    })}
                />
                {errors.title && <p role="alert" className='text-red-500'>{errors.title.message}</p>}
                
                <label htmlFor="postAuthor">Author:</label>
                <select className="
                        w-1/2
                        rounded-md
                        border border-gray-300
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        text-gray-700
                        appearance-none
                        bg-white" 
                    id="postAuthor" 
                        {...register("userId", {
                            defaultValue: originalPost.userId,
                            required: 'Author is required'
                        })} 
                >       
                    {/* adding users */}
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}      
                </select>
                {errors.userId && <p role="alert" className='text-red-500'>{errors.userId.message}</p>}
                
                <label htmlFor="postContent">Content:</label>
                <textarea 
                    className="
                    w-1/2
                    rounded-md
                    border border-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    text-gray-700
                    resize-none
                  "
                    id="postContent"
                    // name="postContent"
                    {...register("content", {
                        defaultValue: originalPost.body,
                        required: 'Content is required'
                    })}
                />
                {errors.content && <p role="alert" className='text-red-500'>{errors.content.message}</p>}

                <div className='text-center'>
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isDirty || !isValid || editRequestStatus !== 'idle' ? `opacity-50 cursor-not-allowed` : ``}`}
                    disabled={!isDirty || !isValid || editRequestStatus !== 'idle'} 
                    >
                        Save Post
                    </button>

                    <button
                        type="submit"
                        className={`bg-red-500 hover:bg-red-700 mx-5 text-white font-bold py-2 px-4 rounded ${editRequestStatus !== 'idle' ? `opacity-50 cursor-not-allowed` : ``}`}
                        disabled={editRequestStatus !== 'idle'} 
                        onClick={onDeletePostClicked}
                    >
                        Delete Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPostForm