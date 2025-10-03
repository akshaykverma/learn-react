# File-by-File Documentation

## 📁 Entry Point & Configuration

### `src/main.jsx` - Application Entry Point
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { fetchUsers } from './features/users/usersSlice.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { extendedApiSlice } from './features/posts/postsSlice.js'
```

**Purpose**: Bootstrap the React application with all necessary providers and initial data fetching.

**Key Concepts**:
- **React.StrictMode**: Enables additional checks and warnings in development
- **Redux Provider**: Makes Redux store available to all components
- **Router Setup**: Enables client-side routing throughout the app
- **Initial Data Fetching**: Dispatches actions to load posts and users on app start

**Learning Points**:
```jsx
// Pre-fetch data on app initialization
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(fetchUsers());
```
This ensures data is available immediately when components mount, improving user experience.

---

### `src/App.jsx` - Route Configuration
```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from "./components/Layout"
import PostsList from "./components/PostsList"
// ... other imports
```

**Purpose**: Defines the application's routing structure using React Router v6.

**Route Structure**:
```
/ (Layout)
├── / (index) → PostsList
├── /post
│   ├── /post (index) → AddPostForm
│   ├── /post/:postId → SinglePostPage
│   └── /post/edit/:postId → EditPostForm
├── /user
│   ├── /user (index) → UsersList
│   └── /user/:userId → UserPage
└── /* → Navigate to "/"
```

**Key Concepts**:
- **Nested Routes**: Routes within routes for better organization
- **Dynamic Routes**: `:postId` and `:userId` parameters
- **Index Routes**: Default child route when parent path matches exactly
- **Catch-all Route**: `*` redirects unknown routes to home

---

## 🏪 State Management

### `src/store/store.js` - Redux Store Configuration
```jsx
import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import { apiSlice } from '../features/api/apiSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        users: usersReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
```

**Purpose**: Central Redux store configuration with RTK Query integration.

**Key Concepts**:
- **configureStore**: Modern Redux store setup with good defaults
- **Dynamic Reducer Path**: `[apiSlice.reducerPath]` allows flexible API slice naming
- **Middleware Chain**: Adds RTK Query middleware for caching, invalidation, polling
- **DevTools**: Enables Redux DevTools extension for debugging

**State Structure**:
```javascript
{
  api: {           // RTK Query cache
    queries: {},   // Cached query results
    mutations: {}  // Mutation states
  },
  users: []        // Traditional Redux slice
}
```

---

### `src/features/api/apiSlice.js` - Base API Configuration
```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Post', 'User'],
    endpoints: builder => ({})
})
```

**Purpose**: Base API slice that other API slices extend from.

**Key Concepts**:
- **createApi**: RTK Query's main API definition function
- **fetchBaseQuery**: Built-in fetch wrapper with good defaults
- **tagTypes**: Define cache invalidation tags for automatic refetching
- **Empty endpoints**: Extended by other slices using `injectEndpoints`

**Cache Tags System**:
- `Post` tag: Used for post-related cache invalidation
- `User` tag: Used for user-related cache invalidation

---

### `src/features/posts/postsSlice.js` - Posts API & State Management
```jsx
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
})
```

**Purpose**: Manages all post-related API calls and state normalization.

**Entity Adapter Benefits**:
```javascript
// Instead of array: [post1, post2, post3]
// Normalized structure: 
{
  ids: ['1', '2', '3'],
  entities: {
    '1': { id: '1', title: 'Post 1', ... },
    '2': { id: '2', title: 'Post 2', ... },
    '3': { id: '3', title: 'Post 3', ... }
  }
}
```

**API Endpoints**:
1. **getPosts**: Fetch all posts with normalization
2. **getPostsByUserId**: Fetch posts by specific user
3. **addNewPost**: Create new post with optimistic updates
4. **updatePost**: Edit existing post
5. **deletePost**: Remove post
6. **addReaction**: Update post reactions with optimistic updates

**Optimistic Updates Example**:
```jsx
addReaction: builder.mutation({
    async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
        // Update UI immediately
        const patchResult = dispatch(
            extendedApiSlice.util.updateQueryData('getPosts', undefined, draft => {
                const post = draft.entities[postId]
                if (post) post.reactions = reactions
            })
        )
        try {
            await queryFulfilled // Wait for server response
        } catch {
            patchResult.undo() // Rollback on failure
        }
    }
})
```

---

### `src/features/users/usersSlice.js` - Users State Management
```jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL)
    return response.data
})
```

**Purpose**: Traditional Redux slice for managing user data from external API.

**Why Not RTK Query Here?**:
- Users are fetched once on app start
- No CRUD operations needed for users
- Demonstrates both RTK Query and traditional Redux patterns

**Async Thunk Pattern**:
```jsx
const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {}, // No synchronous reducers needed
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload // Replace entire state
        })
    }
})
```

---

## 🧩 Components

### `src/components/Layout.jsx` - App Layout Wrapper
```jsx
import { Outlet } from 'react-router-dom'
import Header from './Header'

function Layout() {
    return (
        <>
            <Header />
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}
```

**Purpose**: Provides consistent layout structure for all pages.

**Key Concepts**:
- **Outlet**: Renders child routes from React Router
- **Layout Pattern**: Common UI elements (header, footer) stay consistent
- **Composition**: Wraps all page content with shared elements

---

### `src/components/Header.jsx` - Navigation Header
```jsx
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className="Header">
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/post">Post</Link></li>
                    <li><Link to="/user">Users</Link></li>
                </ul>
            </nav>
        </header>
    )
}
```

**Purpose**: Navigation menu for the application.

**Key Concepts**:
- **Link vs anchor**: `Link` prevents page refresh, maintains SPA behavior
- **Declarative Navigation**: Routes defined in JSX
- **Consistent Navigation**: Available on all pages through Layout

---

### `src/components/PostsList.jsx` - Posts Display Component
```jsx
import { useSelector } from 'react-redux'
import { selectPostIds, useGetPostsQuery } from '../features/posts/postsSlice'
import PostsExcerpt from './PostsExcerpt'

function PostsList() {
    const {
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery()

    const orderedPostIds = useSelector(selectPostIds)
```

**Purpose**: Main posts listing page with loading states.

**Key Concepts**:
- **RTK Query Hook**: `useGetPostsQuery()` handles API call and caching
- **Normalized State**: Uses `selectPostIds` for efficient rendering
- **Loading States**: Handles loading, success, and error states
- **Performance**: Only re-renders when post IDs change, not full post data

**Rendering Pattern**:
```jsx
// Render only IDs, let child components select their own data
content = orderedPostIds.map(postId => 
    <PostsExcerpt key={postId} postId={postId} />
)
```

---

### `src/components/PostsExcerpt.jsx` - Individual Post Card
```jsx
import { useSelector } from 'react-redux'
import { selectPostById } from '../features/posts/postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionsButton from './ReactionsButton'

function PostsExcerpt({ postId }) {
    const post = useSelector(state => selectPostById(state, postId))
```

**Purpose**: Displays individual post summary with author, time, and reactions.

**Key Concepts**:
- **Memoized Selector**: `selectPostById` only re-renders when specific post changes
- **Component Composition**: Combines multiple smaller components
- **Props vs Selectors**: Receives `postId` as prop, selects post data internally

**Performance Benefits**:
- Only re-renders when the specific post changes
- Other posts changing won't trigger re-render
- Efficient for large lists

---

### `src/components/AddPostForm.jsx` - Create Post Form
```jsx
import { useForm } from 'react-hook-form'
import { useAddNewPostMutation } from '../features/posts/postsSlice'
import { useNavigate } from 'react-router-dom'

function AddPostForm() {
    const [addNewPost, {isLoading}] = useAddNewPostMutation()
    
    const {register, handleSubmit, formState: { errors, isValid, isDirty }, reset} = useForm({
        mode: 'onChange'
    })
```

**Purpose**: Form for creating new blog posts with validation.

**Key Concepts**:
- **React Hook Form**: Performant form library with minimal re-renders
- **Real-time Validation**: `mode: 'onChange'` validates on every change
- **RTK Query Mutation**: `useAddNewPostMutation` handles API call
- **Navigation**: `useNavigate` for programmatic routing
- **Form State**: `isDirty`, `isValid` for button state management

**Form Validation Example**:
```jsx
{...register("title", {
    required: 'Title is required',
    minLength: {
        value: 3,
        message: 'Title must be at least 3 characters long'
    },
})}
```

**Mutation Handling**:
```jsx
const onSavePostClicked = async(postData) => {
    if (!isLoading) {
        try {
            await addNewPost({
                body: postData.content, 
                ...postData
            }).unwrap() // unwrap throws errors for try/catch
        } catch (error) {
            console.error('Failed to save the post', error)
        } finally {
            reset() // Clear form
            navigate("/") // Redirect to home
        }
    }
}
```

---

### `src/components/EditPostForm.jsx` - Edit Post Form
```jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById, useUpdatePostMutation } from '../features/posts/postsSlice'

function EditPostForm() {
    const { postId } = useParams()
    const post = useSelector(state => selectPostById(state, postId))
    const [updatePost, { isLoading }] = useUpdatePostMutation()
```

**Purpose**: Form for editing existing posts with pre-populated data.

**Key Concepts**:
- **URL Parameters**: `useParams()` extracts `postId` from route
- **Pre-population**: Form fields filled with existing post data
- **Conditional Rendering**: Shows "Post not found" if post doesn't exist
- **Update Mutation**: Uses `useUpdatePostMutation` for API call

**Pre-population Pattern**:
```jsx
// Set default values from existing post
const {register, handleSubmit, formState: { errors, isValid }} = useForm({
    defaultValues: {
        title: post?.title,
        content: post?.body,
        userId: post?.userId
    }
})
```

---

### `src/components/SinglePostPage.jsx` - Post Detail View
```jsx
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById, useDeletePostMutation } from '../features/posts/postsSlice'

function SinglePostPage() {
    const { postId } = useParams()
    const post = useSelector(state => selectPostById(state, postId))
    const [deletePost] = useDeletePostMutation()
    const navigate = useNavigate()
```

**Purpose**: Detailed view of a single post with edit/delete actions.

**Key Concepts**:
- **URL Parameters**: Gets post ID from route
- **Conditional Rendering**: Handles missing posts gracefully
- **Action Buttons**: Edit and Delete functionality
- **Delete Confirmation**: Could be enhanced with confirmation dialog

**Delete Handler**:
```jsx
const onDeletePostClicked = async () => {
    try {
        await deletePost({ id: post.id }).unwrap()
        navigate('/') // Redirect after deletion
    } catch (err) {
        console.error('Failed to delete the post', err)
    }
}
```

---

### `src/components/ReactionsButton.jsx` - Post Reactions
```jsx
import { useAddReactionMutation } from '../features/posts/postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

function ReactionsButton({ post }) {
    const [addReaction] = useAddReactionMutation()
```

**Purpose**: Interactive emoji reactions for posts with optimistic updates.

**Key Concepts**:
- **Optimistic Updates**: UI updates immediately, rolls back on failure
- **Object Mapping**: `reactionEmoji` maps keys to emoji
- **Event Handling**: Updates reaction count on click
- **Mutation Hook**: Uses RTK Query mutation for API calls

**Reaction Handler**:
```jsx
const reactionClicked = async (name) => {
    const newValue = post.reactions[name] + 1
    const newReactions = { ...post.reactions, [name]: newValue }
    
    try {
        await addReaction({ 
            postId: post.id, 
            reactions: newReactions 
        }).unwrap()
    } catch (err) {
        console.error('Failed to save the post', err)
    }
}
```

---

### `src/components/PostAuthor.jsx` - Author Display
```jsx
import { useSelector } from 'react-redux'
import { selectUserById } from '../features/users/usersSlice'

function PostAuthor({ userId }) {
    const author = useSelector(state => selectUserById(state, userId))
    
    return <span>by {author ? author.name : 'Unknown author'}</span>
}
```

**Purpose**: Displays post author name with fallback for unknown authors.

**Key Concepts**:
- **Parameterized Selector**: `selectUserById` takes userId parameter
- **Fallback Handling**: Shows "Unknown author" if user not found
- **Reusable Component**: Used in multiple places throughout app

---

### `src/components/TimeAgo.jsx` - Relative Time Display
```jsx
import { parseISO, formatDistanceToNow } from 'date-fns'

function TimeAgo({ timestamp }) {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
```

**Purpose**: Shows human-readable relative time (e.g., "2 hours ago").

**Key Concepts**:
- **date-fns Library**: Utility library for date formatting
- **ISO Date Parsing**: Converts ISO string to Date object
- **Accessibility**: `title` attribute shows full timestamp on hover
- **Conditional Rendering**: Only shows time if timestamp exists

---

### `src/components/UsersList.jsx` - Users Listing
```jsx
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllUsers } from '../features/users/usersSlice'

function UsersList() {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))
```

**Purpose**: Lists all users with links to their individual pages.

**Key Concepts**:
- **Redux Selector**: Gets all users from Redux state
- **Dynamic Links**: Creates links to user detail pages
- **List Rendering**: Maps over users array to create list items
- **Key Prop**: Uses `user.id` for React's reconciliation

---

### `src/components/UserPage.jsx` - User Profile & Posts
```jsx
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from '../features/users/usersSlice'
import { useGetPostsByUserIdQuery } from '../features/posts/postsSlice'

function UserPage() {
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))
    
    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId)
```

**Purpose**: Shows user profile information and all their posts.

**Key Concepts**:
- **URL Parameters**: Extracts userId from route
- **Type Conversion**: Converts string userId to number for selector
- **Filtered Query**: `useGetPostsByUserIdQuery` fetches only user's posts
- **Conditional Rendering**: Handles loading states and missing users
- **Data Combination**: Shows both user info and their posts

**Data Flow**:
1. Get userId from URL parameters
2. Select user data from Redux state
3. Fetch user's posts via RTK Query
4. Render user info and posts list

---

## 🎨 Styling & Assets

### `src/index.css` - Global Styles
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global styles and Tailwind CSS imports */
```

**Purpose**: Global CSS with Tailwind CSS integration.

**Key Concepts**:
- **Tailwind Directives**: Imports Tailwind's base, components, and utilities
- **Global Styles**: App-wide styling rules
- **CSS Reset**: Tailwind's base layer normalizes browser defaults

---

## 📊 Data Structure Examples

### Post Object Structure
```javascript
{
  id: "nanoid-generated-id",
  title: "Post Title",
  body: "Post content...",
  userId: 1,
  date: "2024-01-01T12:00:00.000Z",
  reactions: {
    thumbsUp: 0,
    wow: 0,
    heart: 0,
    rocket: 0,
    coffee: 0
  }
}
```

### User Object Structure
```javascript
{
  id: 1,
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  address: { /* address object */ },
  phone: "123-456-7890",
  website: "johndoe.com",
  company: { /* company object */ }
}
```

### Redux State Structure
```javascript
{
  api: {
    queries: {
      'getPosts(undefined)': {
        status: 'fulfilled',
        data: {
          ids: ['1', '2', '3'],
          entities: {
            '1': { /* post object */ },
            '2': { /* post object */ },
            '3': { /* post object */ }
          }
        }
      }
    },
    mutations: { /* mutation states */ }
  },
  users: [
    { id: 1, name: "John Doe", /* ... */ },
    { id: 2, name: "Jane Smith", /* ... */ }
  ]
}
```

---

## 🔄 Data Flow Patterns

### 1. Reading Data (Query)
```
Component → useGetPostsQuery() → RTK Query → Cache Check → API Call (if needed) → Normalize → Redux Store → Component Re-render
```

### 2. Creating Data (Mutation)
```
Component → Form Submit → useAddNewPostMutation() → API Call → Success → Cache Invalidation → Refetch → Component Re-render
```

### 3. Optimistic Updates
```
Component → User Action → Update Cache Immediately → API Call → Success: Keep Changes | Failure: Rollback Changes
```

### 4. Cache Invalidation
```
Mutation Success → Invalidate Tags → Mark Related Queries as Stale → Auto-refetch on Next Access
```

---

This documentation covers every major file and concept in the application. Each section explains the purpose, key concepts, and learning points to help you understand and remember the React patterns used throughout the project.