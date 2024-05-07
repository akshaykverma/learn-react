import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { selectPostById, useUpdatePostMutation, useDeletePostMutation } from '../features/posts/postsSlice';
import { useForm } from 'react-hook-form';
import { selectAllUsers } from '../features/users/usersSlice';

function EditPostForm() {

    const { postId } = useParams();

    console.log(postId);

    const navigate = useNavigate();

    const [updatePost, {isLoading}] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    const originalPost = useSelector((state) => selectPostById(state, postId));
    const users = useSelector(selectAllUsers);
    
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
        if (!isLoading) {
            try {
                
                // send data to the thunk 
                // unwrap will throw any errors during the API call 
                await updatePost({
                    id: originalPost.id,
                    body: postData.content,
                    reactions: originalPost.reactions,  
                    ...postData
                }).unwrap();
                
            } catch (error) {
                console.error('Failed to save the post', error);
            }
            finally {
    
                navigate(`/post/${originalPost.id}`);
                //reset all form fields
                reset();
            }
        }
    }

    const onDeletePostClicked = async () => {
        try {
            await deletePost({ id: postId }).unwrap();

        } catch (err) {
            console.error('Failed to delete the post', err)
        } finally {
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
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isDirty || !isValid || isLoading ? `opacity-50 cursor-not-allowed` : ``}`}
                    disabled={!isDirty || !isValid || isLoading} 
                    >
                        Save Post
                    </button>

                    <button
                        type="button"
                        className={`bg-red-500 hover:bg-red-700 mx-5 text-white font-bold py-2 px-4 rounded ${isLoading ? `opacity-50 cursor-not-allowed` : ``}`}
                        disabled={isLoading} 
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