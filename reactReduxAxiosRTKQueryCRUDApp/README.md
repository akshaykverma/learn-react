# React Redux RTK Query CRUD Application

A comprehensive blog post management application built with React, Redux Toolkit, RTK Query, and React Router. This project demonstrates modern React development patterns including state management, API integration, form handling, and routing.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Application
1. **Start JSON Server** (Backend API):
   ```bash
   json-server --watch data/db.json --port 3500
   ```

2. **Start React App** (in another terminal):
   ```bash
   npm run dev -- --port 3000
   ```

3. **Open browser**: Navigate to `http://localhost:3000`

## 📋 Features

### Core Functionality
- ✅ **Create Posts** - Add new blog posts with title, content, and author
- ✅ **Read Posts** - View all posts or individual post details
- ✅ **Update Posts** - Edit existing posts
- ✅ **Delete Posts** - Remove posts from the system
- ✅ **Post Reactions** - Add emoji reactions (👍, 😮, ❤️, 🚀, ☕)
- ✅ **User Management** - View users and their posts
- ✅ **Form Validation** - Real-time form validation with React Hook Form

### Technical Features
- 🔄 **Optimistic Updates** - Immediate UI feedback for reactions
- 📦 **Normalized State** - Efficient data management with Entity Adapter
- 🚀 **Automatic Caching** - Smart caching and invalidation with RTK Query
- 🎨 **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- 🧭 **Client-side Routing** - Seamless navigation with React Router

## 🏗️ Architecture Overview

### State Management Pattern
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │───▶│   RTK Query      │───▶│   JSON Server   │
│                 │    │   (Server State) │    │   (Backend API) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│ Redux Toolkit   │    │ Entity Adapter   │
│ (Client State)  │    │ (Normalized)     │
└─────────────────┘    └──────────────────┘
```

## 📁 Project Structure

```
src/
├── components/           # React Components
│   ├── AddPostForm.jsx   # Create new posts
│   ├── EditPostForm.jsx  # Edit existing posts
│   ├── PostsList.jsx     # Display all posts
│   ├── PostsExcerpt.jsx  # Individual post card
│   ├── SinglePostPage.jsx# Post detail view
│   ├── ReactionsButton.jsx# Emoji reactions
│   ├── PostAuthor.jsx    # Author display
│   ├── TimeAgo.jsx       # Relative time display
│   ├── UsersList.jsx     # All users list
│   ├── UserPage.jsx      # User profile & posts
│   ├── Header.jsx        # Navigation header
│   └── Layout.jsx        # App layout wrapper
├── features/             # Redux Features
│   ├── api/
│   │   └── apiSlice.js   # RTK Query base API
│   ├── posts/
│   │   └── postsSlice.js # Posts API endpoints
│   └── users/
│       └── usersSlice.js # Users state management
├── store/
│   └── store.js          # Redux store configuration
├── App.jsx               # Route definitions
├── main.jsx              # App entry point
└── index.css             # Global styles
```

## 🔧 Key Technologies

### Frontend Stack
- **React 18** - UI library with hooks and functional components
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

### State Management
- **Redux Toolkit** - Modern Redux with less boilerplate
- **RTK Query** - Data fetching and caching solution
- **Entity Adapter** - Normalized state management

### Form & Validation
- **React Hook Form** - Performant form library
- **Built-in Validation** - Real-time form validation

### Backend
- **JSON Server** - Mock REST API for development
- **JSONPlaceholder** - External API for user data

## 📚 Learning Concepts

### React Fundamentals
```jsx
// Functional Components with Hooks
function PostsList() {
    const { data, isLoading, error } = useGetPostsQuery();
    const posts = useSelector(selectAllPosts);
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
    );
}
```

### Redux Toolkit Patterns
```jsx
// RTK Query API Slice
export const postsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Post']
        }),
        addPost: builder.mutation({
            query: newPost => ({
                url: '/posts',
                method: 'POST',
                body: newPost
            }),
            invalidatesTags: ['Post']
        })
    })
});
```

### Form Handling with React Hook Form
```jsx
// Form with Validation
const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (data) => {
    await addNewPost(data).unwrap();
    navigate('/');
};

return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <input 
            {...register('title', { 
                required: 'Title is required',
                minLength: { value: 3, message: 'Min 3 characters' }
            })}
        />
        {errors.title && <span>{errors.title.message}</span>}
    </form>
);
```

### Routing with React Router
```jsx
// Nested Routes
<Routes>
    <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
    </Route>
</Routes>
```

## 🎯 Advanced Patterns

### Optimistic Updates
```jsx
// Immediate UI update with rollback on failure
addReaction: builder.mutation({
    async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
            postsApi.util.updateQueryData('getPosts', undefined, draft => {
                const post = draft.entities[postId];
                if (post) post.reactions = reactions;
            })
        );
        try {
            await queryFulfilled;
        } catch {
            patchResult.undo(); // Rollback on failure
        }
    }
})
```

### Normalized State with Entity Adapter
```jsx
// Efficient state structure: { ids: [], entities: {} }
const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date)
});

// Auto-generated selectors
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts);
```

### Cache Management
```jsx
// Automatic cache invalidation
addNewPost: builder.mutation({
    invalidatesTags: [{ type: 'Post', id: 'LIST' }] // Refetch all posts
}),
updatePost: builder.mutation({
    invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }] // Refetch specific post
})
```

## 🔍 Data Flow

1. **Component** calls RTK Query hook (`useGetPostsQuery()`)
2. **RTK Query** checks cache, makes API call if needed
3. **JSON Server** returns data
4. **Entity Adapter** normalizes data structure
5. **Redux Store** updates with new state
6. **Component** re-renders with updated data

## 🛠️ Development Commands

```bash
# Development
npm run dev -- --port 3000  # Start dev server on port 3000
npm run build               # Build for production
npm run preview             # Preview production build
npm run lint                # Run ESLint

# Backend
json-server --watch data/db.json --port 3500  # Start API server
```

## 📊 API Endpoints

### Posts API (localhost:3500)
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `PATCH /posts/:id` - Update post reactions

### Users API (External)
- `GET https://jsonplaceholder.typicode.com/users` - Get all users

## 🎨 Styling Approach

- **Tailwind CSS** for utility-first styling
- **Responsive design** with mobile-first approach
- **Component-scoped styles** using Tailwind classes
- **Consistent color scheme** across the application

## 🚀 Performance Optimizations

- **RTK Query Caching** - Automatic request deduplication
- **Normalized State** - Efficient updates and lookups
- **Memoized Selectors** - Prevent unnecessary re-renders
- **Code Splitting** - Route-based code splitting with React Router
- **Optimistic Updates** - Immediate UI feedback

## 📈 Next Steps for Learning

1. **Add Authentication** - User login/logout functionality
2. **Implement Search** - Search posts by title or content
3. **Add Pagination** - Handle large datasets efficiently
4. **Real-time Updates** - WebSocket integration
5. **Testing** - Unit and integration tests
6. **TypeScript** - Add type safety
7. **PWA Features** - Offline functionality

## 🔗 Useful Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Guide](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router Documentation](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Happy Learning! 🎉**

This project covers essential React patterns and modern state management. Use it as a reference for building scalable React applications.