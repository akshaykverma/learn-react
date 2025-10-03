# React Redux RTK Query CRUD App - Sequence Diagrams

## Application Initialization

```mermaid
sequenceDiagram
    participant User
    participant Main as main.jsx
    participant Store as Redux Store
    participant API as JSON Server
    participant ExtAPI as JSONPlaceholder
    participant App as App Component

    User->>Main: Load Application
    Main->>Store: Initialize Redux Store
    Main->>Store: Dispatch getPosts.initiate()
    Main->>Store: Dispatch fetchUsers()
    Store->>API: GET /posts
    Store->>ExtAPI: GET /users
    API-->>Store: Posts Data
    ExtAPI-->>Store: Users Data
    Main->>App: Render App with Router
    App-->>User: Display PostsList (Home)
```

## Create New Post Flow

```mermaid
sequenceDiagram
    participant User
    participant AddForm as AddPostForm
    participant Hook as useAddNewPostMutation
    participant Store as Redux Store
    participant API as JSON Server
    participant PostsList as PostsList

    User->>AddForm: Navigate to /post
    User->>AddForm: Fill form & submit
    AddForm->>Hook: addNewPost(postData)
    Hook->>Store: Dispatch mutation
    Store->>API: POST /posts
    API-->>Store: New post created
    Store->>Store: Invalidate 'Post' LIST tag
    Store->>API: Refetch GET /posts
    API-->>Store: Updated posts list
    AddForm->>AddForm: reset() & navigate("/")
    AddForm-->>PostsList: Redirect to home
    PostsList-->>User: Display updated posts
```

## View Single Post Flow

```mermaid
sequenceDiagram
    participant User
    participant PostsList as PostsList
    participant SinglePost as SinglePostPage
    participant Store as Redux Store
    participant API as JSON Server

    User->>PostsList: Click on post
    PostsList->>SinglePost: Navigate to /post/:postId
    SinglePost->>Store: useGetPostsQuery()
    Store->>Store: Check cache
    alt Cache Hit
        Store-->>SinglePost: Return cached data
    else Cache Miss
        Store->>API: GET /posts
        API-->>Store: Posts data
        Store-->>SinglePost: Return post data
    end
    SinglePost-->>User: Display post details
```

## Add Reaction Flow (Optimistic Update)

```mermaid
sequenceDiagram
    participant User
    participant ReactBtn as ReactionsButton
    participant Hook as useAddReactionMutation
    participant Store as Redux Store
    participant API as JSON Server

    User->>ReactBtn: Click reaction button
    ReactBtn->>Hook: addReaction({postId, reactions})
    Hook->>Store: Optimistic update (updateQueryData)
    Store->>Store: Update cache immediately
    Store-->>ReactBtn: Show updated reaction count
    ReactBtn-->>User: Immediate UI feedback
    
    par API Call
        Hook->>API: PATCH /posts/:postId
        alt Success
            API-->>Hook: Success response
            Hook->>Store: Confirm update
        else Failure
            API-->>Hook: Error response
            Hook->>Store: Undo optimistic update
            Store-->>ReactBtn: Revert to original state
        end
    end
```

## Edit Post Flow

```mermaid
sequenceDiagram
    participant User
    participant SinglePost as SinglePostPage
    participant EditForm as EditPostForm
    participant Hook as useUpdatePostMutation
    participant Store as Redux Store
    participant API as JSON Server

    User->>SinglePost: Click Edit button
    SinglePost->>EditForm: Navigate to /post/edit/:postId
    EditForm->>Store: Get post data from cache
    Store-->>EditForm: Pre-populate form
    User->>EditForm: Modify & submit
    EditForm->>Hook: updatePost(postData)
    Hook->>Store: Dispatch mutation
    Store->>API: PUT /posts/:postId
    API-->>Store: Updated post
    Store->>Store: Invalidate specific post tag
    EditForm->>SinglePost: Navigate back
    SinglePost-->>User: Display updated post
```

## Delete Post Flow

```mermaid
sequenceDiagram
    participant User
    participant SinglePost as SinglePostPage
    participant Hook as useDeletePostMutation
    participant Store as Redux Store
    participant API as JSON Server
    participant PostsList as PostsList

    User->>SinglePost: Click Delete button
    SinglePost->>Hook: deletePost({id})
    Hook->>Store: Dispatch mutation
    Store->>API: DELETE /posts/:id
    API-->>Store: Deletion confirmed
    Store->>Store: Invalidate specific post tag
    Store->>Store: Remove from cache
    SinglePost->>PostsList: Navigate to home
    PostsList-->>User: Display updated posts list
```

## User Posts View Flow

```mermaid
sequenceDiagram
    participant User
    participant UsersList as UsersList
    participant UserPage as UserPage
    participant Hook as useGetPostsByUserIdQuery
    participant Store as Redux Store
    participant API as JSON Server

    User->>UsersList: Click on user
    UsersList->>UserPage: Navigate to /user/:userId
    UserPage->>Hook: useGetPostsByUserIdQuery(userId)
    Hook->>Store: Check cache for user posts
    alt Cache Hit
        Store-->>UserPage: Return cached user posts
    else Cache Miss
        Store->>API: GET /posts?userId=:userId
        API-->>Store: User's posts
        Store-->>UserPage: Return user posts
    end
    UserPage-->>User: Display user's posts
```