import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAddNewPostMutation } from '../features/posts/postsSlice';
import { useForm } from 'react-hook-form'
import { selectAllUsers } from '../features/users/usersSlice';

function AddPostForm() {


    const [addNewPost, {isLoading}] = useAddNewPostMutation();

    const {register, handleSubmit, formState: { errors, isValid, isDirty }, reset} = useForm({
        mode: 'onChange' // Validation will trigger on the 'change' event
      });

    const users = useSelector(selectAllUsers);
    const navigate = useNavigate();

    const onSavePostClicked = async(postData) => {
        console.log(postData);
        if (!isLoading) {
            try {
                 
                // unwrap will throw any errors during the API call 
                await addNewPost({
                    body: postData.content, 
                    ...postData
                }).unwrap();
    
            } catch (error) {
                console.error('Failed to save the post', error);
            }
            finally {

                //reset all form fields
                reset();
                navigate("/");
            }
        }
    }

    return (
        <div className='flex flex-wrap min-w-[700px] flex-col'>
            <h1 className='text-center my-10 text-3xl'>Add a New Post</h1>

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
                        {...register("userId")} 
                >       
                    {/* adding users */}
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}      
                </select>
                
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
                    {...register("content")}
                />
                <div className='text-center'>
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isDirty || !isValid || isLoading ? `opacity-50 cursor-not-allowed` : ``}`}
                    disabled={!isDirty || !isValid || isLoading} 
                    >
                        Save Post
                    </button>
                </div>
            </form>
        </div>
    )
}




export default AddPostForm