# Todo RTK Query - Advanced Data Fetching

## 🎯 Project Overview
Modern todo application using RTK Query for efficient data fetching, caching, and synchronization.

## 🔑 Key Concepts

### RTK Query
- **Data Fetching**: Simplified API calls
- **Caching**: Automatic response caching
- **Background Updates**: Automatic refetching
- **Optimistic Updates**: Immediate UI feedback

### Advanced Redux Patterns
- **API Slice**: Centralized API logic
- **Query Hooks**: Auto-generated React hooks
- **Cache Management**: Intelligent data caching
- **Real-time Sync**: Background data synchronization

## 📝 What You'll Learn

- **RTK Query**: Modern Redux data fetching
- **API Design**: RESTful API integration
- **Cache Strategies**: Optimizing data access
- **Real-time Updates**: Keeping data fresh

## 🔍 Important Code Patterns

### API Slice Definition
```jsx
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3500'
  }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
      providesTags: ['Todo']
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todo']
    })
  })
});
```

### Auto-generated Hooks
```jsx
const {
  data: todos,
  isLoading,
  isSuccess,
  isError,
  error
} = useGetTodosQuery();

const [addTodo] = useAddTodoMutation();
```

### Optimistic Updates
```jsx
const [updateTodo] = useUpdateTodoMutation();

const handleToggle = async (todo) => {
  try {
    await updateTodo({
      ...todo,
      completed: !todo.completed
    }).unwrap();
  } catch (err) {
    console.error('Failed to update todo:', err);
  }
};
```

## 📁 Project Structure
```
src/
├── features/
│   ├── api/
│   │   └── apiSlice.js       # RTK Query API definition
│   └── todos/
│       └── TodoList.jsx      # Todo components
├── data/
│   └── db.json               # JSON Server database
└── App.jsx                   # Main application
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start JSON Server (backend)
npx json-server --watch data/db.json --port 3500

# Start React app (in another terminal)
npm run dev
```

## 💡 Key Features

- **Real-time Data**: Automatic background updates
- **Optimistic UI**: Immediate feedback on actions
- **Error Handling**: Graceful failure recovery
- **Loading States**: Visual feedback during operations
- **Cache Management**: Efficient data storage
- **Offline Support**: Works with cached data

## 🔄 RTK Query Benefits

### Automatic Features
- **Caching**: Intelligent response caching
- **Deduplication**: Prevents duplicate requests
- **Background Refetching**: Keeps data fresh
- **Error Retry**: Automatic retry on failure

### Developer Experience
- **Generated Hooks**: No manual hook creation
- **TypeScript Support**: Full type safety
- **DevTools Integration**: Excellent debugging
- **Minimal Boilerplate**: Less code to write

## 🎯 Advanced Concepts

- **Tag-based Invalidation**: Smart cache updates
- **Streaming Updates**: Real-time data streaming
- **Conditional Fetching**: Fetch data when needed
- **Polling**: Automatic periodic updates
- **Prefetching**: Loading data before needed