# React Redux RTK Query CRUD App - Architecture Diagram

```mermaid
graph TB
    %% Entry Point
    Main[main.jsx<br/>Entry Point] --> Provider[Redux Provider]
    Main --> Router[React Router]
    
    %% Store Configuration
    Provider --> Store[Redux Store<br/>store.js]
    Store --> ApiSlice[API Slice<br/>RTK Query]
    Store --> UsersSlice[Users Slice<br/>Redux Toolkit]
    
    %% API Layer
    ApiSlice --> PostsAPI[Posts API<br/>postsSlice.js]
    PostsAPI --> JSONServer[(JSON Server<br/>localhost:3500)]
    UsersSlice --> JSONPlaceholder[(JSONPlaceholder API<br/>External Users API)]
    
    %% Routing Structure
    Router --> App[App.jsx<br/>Route Configuration]
    App --> Layout[Layout Component]
    Layout --> Header[Header Component]
    Layout --> Outlet[Router Outlet]
    
    %% Main Routes
    Outlet --> PostsList[PostsList<br/>Home Route '/']
    Outlet --> AddPost[AddPostForm<br/>'/post']
    Outlet --> SinglePost[SinglePostPage<br/>'/post/:postId']
    Outlet --> EditPost[EditPostForm<br/>'/post/edit/:postId']
    Outlet --> UsersList[UsersList<br/>'/user']
    Outlet --> UserPage[UserPage<br/>'/user/:userId']
    
    %% Post Components
    PostsList --> PostsExcerpt[PostsExcerpt<br/>Individual Post Card]
    PostsExcerpt --> PostAuthor[PostAuthor Component]
    PostsExcerpt --> TimeAgo[TimeAgo Component]
    PostsExcerpt --> ReactionsButton[ReactionsButton Component]
    
    %% RTK Query Hooks
    PostsList -.->|useGetPostsQuery| PostsAPI
    AddPost -.->|useAddNewPostMutation| PostsAPI
    EditPost -.->|useUpdatePostMutation| PostsAPI
    SinglePost -.->|useGetPostsQuery| PostsAPI
    ReactionsButton -.->|useAddReactionMutation| PostsAPI
    UserPage -.->|useGetPostsByUserIdQuery| PostsAPI
    
    %% Redux Selectors
    PostsList -.->|selectPostIds| Store
    PostAuthor -.->|selectAllUsers| Store
    UsersList -.->|selectAllUsers| Store
    UserPage -.->|selectUserById| Store
    
    %% Data Flow
    PostsAPI --> |CRUD Operations| PostsData[Posts Data<br/>Normalized State]
    UsersSlice --> |Async Thunk| UsersData[Users Data<br/>Array State]
    
    %% Form Handling
    AddPost --> ReactHookForm[React Hook Form<br/>Form Validation]
    EditPost --> ReactHookForm
    
    %% Styling
    subgraph Styling
        TailwindCSS[Tailwind CSS<br/>Utility Classes]
    end
    
    %% State Management Pattern
    subgraph StateManagement[State Management]
        RTKQuery[RTK Query<br/>Server State]
        ReduxToolkit[Redux Toolkit<br/>Client State]
        EntityAdapter[Entity Adapter<br/>Normalized Data]
    end
    
    %% API Features
    subgraph APIFeatures[RTK Query Features]
        Caching[Automatic Caching]
        Invalidation[Cache Invalidation]
        OptimisticUpdates[Optimistic Updates]
        Tags[Providestags/InvalidatesTags]
    end
    
    %% Component Relationships
    PostsAPI --> EntityAdapter
    PostsAPI --> Caching
    PostsAPI --> Invalidation
    PostsAPI --> OptimisticUpdates
    PostsAPI --> Tags
    
    %% Styling Classes
    classDef component fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000000
    classDef api fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000000
    classDef store fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px,color:#000000
    classDef route fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000000
    
    class PostsList,AddPost,SinglePost,EditPost,UsersList,UserPage,PostsExcerpt,PostAuthor,TimeAgo,ReactionsButton,Header,Layout component
    class PostsAPI,UsersSlice,ApiSlice api
    class Store,Provider store
    class App,Router,Outlet route
```

## Architecture Overview

### Key Components:
- **Entry Point**: main.jsx with Redux Provider and React Router setup
- **State Management**: Redux Toolkit with RTK Query for server state
- **Routing**: React Router with nested routes and layout components
- **API Layer**: RTK Query for posts, Redux Toolkit for users

### Features:
- CRUD Operations for posts
- Normalized state with Entity Adapter
- Automatic caching and invalidation
- Optimistic updates for reactions
- Form validation with React Hook Form
- Tailwind CSS styling