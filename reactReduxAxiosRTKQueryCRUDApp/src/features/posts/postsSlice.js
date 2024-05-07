import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import {sub} from 'date-fns';
import { nanoid } from 'nanoid';
import { apiSlice } from "../api/apiSlice";


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
const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        // get Post API Call and setting in the redux normalized form of {ids: [], entities: {}}
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                //console.log(loadedPosts);
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            // means it is tagging all items with tags Post and LIST
            // also for individual post it is tagging with Post and id
            // means if any id is invalidated whole list will be invalidated to automatically fetch posts
            // also if we are adding new post it will automatically invalidate the list as it is invalidating the tag LIST
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),

        getPostsByUserId: builder.query({
            query: (userId) => `/posts?userId=${userId}`,
            transformResponse: responseData => {
                let min = 1;
                const loadedPosts = responseData.map(post => {
                    if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    if (!post?.reactions) post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                // setAll: accepts an array of entities or an object in the shape of Record<EntityId, T>, and 
                // replaces all existing entities with the values in the array.
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                console.log(result);
                return [
                    // means if any one of the ids of the above query invalidates 
                    // this query will automatically be fetched
                    ...result.ids.map(id => ({ type: 'Post', id }))
                ]
            }
        }),

        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    id: nanoid(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                }
            }),
            // all posts will be invalidated and will be fetched
            // if we want to updated the cache and not fetch all posts 
            // then we have to use optimistic update as done in addReaction
            invalidatesTags: [
                { type: 'Post', id: "LIST" }    
            ]
        }),

        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString(),
                }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),

        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),

        // in this we are not invalidating the cache as we are doing optimistic update
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions }
            }),
            async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
                // `updateQueryData` requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                        // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
                        const post = draft.entities[postId]
                        if (post) post.reactions = reactions
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    // optimistic update
                    // means as the data is first updated in the cache
                    // and then it is sending the network API request.
                    // Now if the network request fails then the data updated in the cache will be undone
                    patchResult.undo()
                }
            }
        })
    })
})

export const { useGetPostsQuery, useGetPostsByUserIdQuery, useAddNewPostMutation, useDeletePostMutation, useUpdatePostMutation, useAddReactionMutation } = extendedApiSlice;

// returns the query result object
export const selectPostsResult = apiSlice.endpoints.getPosts.select();

// Creates memoized selector that returns the normalized state object
export const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object
);


//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
    // Pass in a selector that returns the posts slice of state
    // ?? -> means if on the left is null or undefined then on the right is returned
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState);

