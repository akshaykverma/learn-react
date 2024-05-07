import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


// 1. createApi : The core of RTK Query's functionality. It allows you to define a set of "endpoints" that describe 
// how to retrieve data from backend APIs and other async sources, 
// including the configuration of how to fetch and transform that data. 
// In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.

// 2. fetchBaseQuery(): A small wrapper around fetch that aims to simplify requests. 

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3500',
    }),
    // they can be used for caching and invalidation. 
    // When defining a tag type, you will be able to provide them with 
    // providesTags and invalidate them with invalidatesTags when configuring endpoints.
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos']
        }),
        // mutations means we are changing the data
        addTodo: builder.mutation({
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
 } = apiSlice
