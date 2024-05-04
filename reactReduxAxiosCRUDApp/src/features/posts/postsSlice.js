import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {sub} from 'date-fns';
import { nanoid } from 'nanoid';
// import {http} from "../../http-common";
import  axios from "axios";
import { act } from "react";

// const initialState = [
//     {
//         id: '1',
//         title: 'Learning Redux Toolkit',
//         content: "I've heard good things.",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {
//         id: '2',
//         title: 'Slices...',
//         content: "The more I say slice, the more I want pizza.",
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     }
// ]

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

// Free fake and reliable API for testing and prototyping
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// API call for fetching posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {        
        const response = await axios.get(POSTS_URL);
        console.log(response.data);
        return [...response.data];
    } catch (error) {
        console.log(error);
        return error.message;
    } 
});

// API call to add new post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
})

// API call to add new post
export const editPost = createAsyncThunk('posts/editPost', async (updatedPostData) => {
    console.log(updatedPostData);

    const { id } = updatedPostData;

    try {
        const response = await axios.put(`${POSTS_URL}/${id}` , updatedPostData);
        return response.data;
    } catch (error) {
        //return err.message;
        console.error('editPost : Error', error);
        return updatedPostData; // only for testing Redux!
    }
})

// API call to delete post
export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    const { id } = initialPost;
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        if (response?.status === 200) return initialPost;
        return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // replaced by extraReducers : addNewPost Thunk
        addPost: {
            reducer : (state, action) => {
                state.posts.push(action.payload);
            },

            // before reducer prepare is called. 
            // we can add some logic here to transform the data
            // before it is passed to the reducer
            prepare : (postData) => {
                return {
                    payload : {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        },
                        ...postData,
                    }
                }
            }
        },

        addReaction : (state, action) => {
            const {postId, reaction} = action.payload;

            console.log(state);

            state.posts.map(post => {
                if (post.id === postId) {
                    post.reactions[reaction]++;
                }
                return post;
            });
        }   
    },
    // making use of the async thunk 
    // and different states of the thunk while making a call to the API 
    extraReducers : builder => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';

                //Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.id = nanoid(),
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    };
                    return post;
                });
                console.log(loadedPosts);
                // Add any fetched posts to the array
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                
                action.payload.userId = Number(action.payload.userId);
                action.payload.id = nanoid();
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                };  
                console.log(action.payload);
                state.posts.push(action.payload);
            })
            .addCase(editPost.fulfilled, (state, action) => {
                console.log(action.payload);
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                //const { id } = action.payload;
                // const posts = state.posts.filter(post => post.id !== id);
                // state.posts =  [...posts, action.payload];

                state.posts = state.posts.map(post => (
                    post.id === action.payload.id ?
                    {
                        ...action.payload,
                        userId : Number(action.payload.userId),
                        date : new Date().toISOString()
                    }
                    : post));
            
            }).addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                state.posts = state.posts.filter(post => post.id !== id);
            })
    }
})

// exporting the posts from the state itself 
// so that if in future the name of state (posts) changes, 
// we can just change it here
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsRequestStatus = (state) => state.posts.status;
export const getPostsRequestError = (state) => state.posts.error;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);   

export const {addPost, addReaction} = postsSlice.actions;

export default postsSlice.reducer;
