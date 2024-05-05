import { createAsyncThunk, createSlice, createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import {sub} from 'date-fns';
import { nanoid } from 'nanoid';
// import {http} from "../../http-common";
import  axios from "axios";

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

// Free fake and reliable API for testing and prototyping

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';


// 1. createEntityAdapter: This function is provided by Redux Toolkit and is used to simplify the 
// management of normalized state data in a Redux store. 
// It returns an adapter object with pre-defined reducer functions for 
// common CRUD operations (Create, Read, Update, Delete) on entities.

// 2. postsAdapter: This variable holds the adapter object returned by createEntityAdapter. 
// The adapter contains pre-defined reducer functions such as addOne, addMany, upsertOne, 
// upsertMany, removeOne, removeMany, updateOne, updateMany, setAll, removeAll, and getSelectors. 
// These functions can be used to manage the state of entities in the Redux store in a normalized way.

// 3. createEntityAdapter streamlines the process of managing normalized state data in Redux,
//  offering convenience, performance optimizations, and improved code organization, 
// making it a valuable tool for building scalable and maintainable Redux applications.

const postsAdapter = createEntityAdapter({
    // default sorting
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})

// getInitialState -> Returns a new entity state object like {ids: [], entities: {}}.
// Basically converting the data passed in the store for posts in the format of {ids: [], entities: {}}.
// e.g => {ids: ['kat2l32-EsyIdJmsf3CNP', 'YDCK6hip5ehCrJdoB4c9l'],
// entities: {
//     'kat2l32-EsyIdJmsf3CNP': {
//         userId: 1,
//         id: 'kat2l32-EsyIdJmsf3CNP',
//         title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
//         body: 'quia et suscipit\n' +  
//         date: '2024-05-05T10:37:07.227Z',
//         reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 }
//       }
//     }
// }
const initialState = postsAdapter.getInitialState({
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    count: 0
});

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
        // replaced (not using anymore) by extraReducers : addNewPost Thunk
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

            console.log(state.entities);

            // state.posts.map(post => {
            //     if (post.id === postId) {
            //         post.reactions[reaction]++;
            //     }
            //     return post;
            // });

            const existingPost = state.entities[postId];
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }

        },
        increaseCount : (state, action) => {
            state.count = state.count + 1;
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
                //state.posts = state.posts.concat(loadedPosts);
                postsAdapter.upsertMany(state, loadedPosts);
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
                //console.log(state);
                console.log(action.payload);
                //state.posts.push(action.payload);

                postsAdapter.addOne(state, action.payload);

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

                action.payload.date = new Date().toISOString();
                action.payload.userId = Number(action.payload.userId);

                // state.posts = state.posts.map(post => (
                //     post.id === action.payload.id ?
                //     {
                //         ...action.payload
                //     }
                //     : post));

                postsAdapter.upsertOne(state, action.payload);
            
            }).addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                //state.posts = state.posts.filter(post => post.id !== id);
                postsAdapter.removeOne(state, id);
            })
    }
})

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)

// exporting the posts from the state itself 
// so that if in future the name of state (posts) changes, 
// we can just change it here
// export const selectAllPosts = (state) => state.posts.posts;
export const getPostsRequestStatus = (state) => state.posts.status;
export const getPostsRequestError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;


// export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);  

// 1. createSelector: This function is imported from the Reselect library. 
// It creates a memoized selector, meaning it caches the results of its computation.
// If the arguments to the selector remain the same between calls, it returns the cached result instead of recomputing.

// 2. [selectAllPosts, (state, userId) => userId]: The first argument to createSelector is an array containing the input selectors. 
// In this case, there are two input selectors. The first one, selectAllPosts, 
// likely selects all posts from the Redux store. The second one is an inline arrow function (state, userId) => userId. 
// This function extracts the userId from the Redux state. The state argument is implicit and provided by Redux.

// 3. (posts, userId) => posts.filter(post => post.userId === userId): The second argument to createSelector 
// is a function that computes the final output based on the values returned by the input selectors. 
// In this case, it receives the posts array and userId extracted from the input selectors. 
// It filters the posts array to only include posts where the userId matches the given userId.

export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
);

export const {addPost, addReaction, increaseCount} = postsSlice.actions;

export default postsSlice.reducer;
