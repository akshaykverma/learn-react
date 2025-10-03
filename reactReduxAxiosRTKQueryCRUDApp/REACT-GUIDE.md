# Complete React Guide - Fundamentals to Advanced

## 📚 Table of Contents
1. [React Fundamentals](#react-fundamentals)
2. [Components](#components)
3. [JSX](#jsx)
4. [Props](#props)
5. [State](#state)
6. [Hooks](#hooks)
7. [Event Handling](#event-handling)
8. [Conditional Rendering](#conditional-rendering)
9. [Lists and Keys](#lists-and-keys)
10. [Forms](#forms)
11. [Component Lifecycle](#component-lifecycle)
12. [Context API](#context-api)
13. [React Router](#react-router)
14. [Performance Optimization](#performance-optimization)
15. [Testing](#testing)
16. [Best Practices](#best-practices)
17. [Interview Questions](#interview-questions)

---

## 🚀 React Fundamentals

### What is React?
React is a JavaScript library for building user interfaces, particularly web applications. It's component-based, declarative, and uses a virtual DOM for efficient updates.

### Key Concepts
- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Describe what the UI should look like for any given state
- **Virtual DOM**: JavaScript representation of the real DOM for efficient updates
- **Unidirectional Data Flow**: Data flows down, events flow up

### React vs Vanilla JavaScript
```javascript
// Vanilla JavaScript (Imperative)
const button = document.createElement('button')
button.textContent = 'Click me'
button.addEventListener('click', () => {
    button.textContent = 'Clicked!'
})
document.body.appendChild(button)

// React (Declarative)
function Button() {
    const [clicked, setClicked] = useState(false)
    return (
        <button onClick={() => setClicked(true)}>
            {clicked ? 'Clicked!' : 'Click me'}
        </button>
    )
}
```

---

## 🧩 Components

### What are Components?
Components are independent, reusable pieces of UI. They accept inputs (props) and return React elements describing what should appear on screen.

### Function Components (Modern Approach)
```javascript
// Basic function component
function Welcome() {
    return <h1>Hello, World!</h1>
}

// Arrow function component
const Welcome = () => {
    return <h1>Hello, World!</h1>
}

// Component with props
function Welcome({ name }) {
    return <h1>Hello, {name}!</h1>
}

// Usage
<Welcome name="John" />
```

### Class Components (Legacy)
```javascript
import React, { Component } from 'react'

class Welcome extends Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>
    }
}
```

### Component Composition
```javascript
// From our app: Layout component
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

// PostsExcerpt component composition
function PostsExcerpt({ postId }) {
    const post = useSelector(state => selectPostById(state, postId))
    
    return (
        <article>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
            <ReactionsButton post={post} />
        </article>
    )
}
```

---

## 📝 JSX

### What is JSX?
JSX is a syntax extension for JavaScript that looks similar to HTML. It describes what the UI should look like.

### JSX Rules
1. **Single Parent Element**: Must return single element (or Fragment)
2. **Self-Closing Tags**: `<img />`, `<input />`, `<br />`
3. **camelCase Attributes**: `className`, `onClick`, `htmlFor`
4. **JavaScript Expressions**: Use `{}` for dynamic content

### JSX Examples
```javascript
// Basic JSX
const element = <h1>Hello, World!</h1>

// JSX with expressions
const name = 'John'
const element = <h1>Hello, {name}!</h1>

// JSX with attributes
const element = <img src={user.avatarUrl} alt={user.name} />

// JSX with children
const element = (
    <div className="container">
        <h1>Welcome</h1>
        <p>This is a paragraph</p>
    </div>
)

// Fragment (multiple elements without wrapper)
const element = (
    <>
        <h1>Title</h1>
        <p>Paragraph</p>
    </>
)
```

### JSX vs HTML Differences
```javascript
// HTML
<div class="container">
    <label for="name">Name:</label>
    <input type="text" id="name" onclick="handleClick()">
</div>

// JSX
<div className="container">
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" onClick={handleClick} />
</div>
```

### Conditional JSX
```javascript
// From our app: Conditional rendering
function PostsList() {
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery()
    
    let content
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = orderedPostIds.map(postId => 
            <PostsExcerpt key={postId} postId={postId} />
        )
    } else if (isError) {
        content = <p>Error: {error}</p>
    }
    
    return <section>{content}</section>
}
```

---

## 📦 Props

### What are Props?
Props (properties) are read-only inputs passed to components. They allow data to flow from parent to child components.

### Basic Props
```javascript
// Parent component
function App() {
    return <Welcome name="John" age={25} />
}

// Child component
function Welcome(props) {
    return <h1>Hello, {props.name}! You are {props.age} years old.</h1>
}

// With destructuring
function Welcome({ name, age }) {
    return <h1>Hello, {name}! You are {age} years old.</h1>
}
```

### Props Types
```javascript
// String props
<Welcome name="John" />

// Number props
<Welcome age={25} />

// Boolean props
<Welcome isActive={true} />
<Welcome isActive /> {/* Shorthand for true */}

// Array props
<Welcome hobbies={['reading', 'coding']} />

// Object props
<Welcome user={{ name: 'John', age: 25 }} />

// Function props
<Welcome onClick={() => console.log('clicked')} />
```

### Props from Our App
```javascript
// PostAuthor component receives userId prop
function PostAuthor({ userId }) {
    const author = useSelector(state => selectUserById(state, userId))
    return <span>by {author ? author.name : 'Unknown author'}</span>
}

// Usage in PostsExcerpt
<PostAuthor userId={post.userId} />

// ReactionsButton receives entire post object
function ReactionsButton({ post }) {
    const [addReaction] = useAddReactionMutation()
    // ... component logic
}

// Usage
<ReactionsButton post={post} />
```

### Default Props
```javascript
// Function component with default parameters
function Welcome({ name = 'Guest', age = 0 }) {
    return <h1>Hello, {name}! You are {age} years old.</h1>
}

// Class component default props
class Welcome extends Component {
    static defaultProps = {
        name: 'Guest',
        age: 0
    }
    
    render() {
        return <h1>Hello, {this.props.name}!</h1>
    }
}
```

### Props Validation (PropTypes)
```javascript
import PropTypes from 'prop-types'

function Welcome({ name, age, isActive }) {
    return <h1>Hello, {name}!</h1>
}

Welcome.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number,
    isActive: PropTypes.bool
}
```

---

## 🔄 State

### What is State?
State is data that can change over time. When state changes, React re-renders the component.

### useState Hook
```javascript
import { useState } from 'react'

function Counter() {
    // Declare state variable with initial value
    const [count, setCount] = useState(0)
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    )
}
```

### State Types
```javascript
// String state
const [name, setName] = useState('')

// Number state
const [count, setCount] = useState(0)

// Boolean state
const [isVisible, setIsVisible] = useState(false)

// Array state
const [items, setItems] = useState([])

// Object state
const [user, setUser] = useState({ name: '', email: '' })
```

### Updating State
```javascript
// Simple state update
const [count, setCount] = useState(0)
setCount(count + 1)

// Functional update (recommended for dependent updates)
setCount(prevCount => prevCount + 1)

// Array state updates
const [items, setItems] = useState([])

// Add item
setItems(prevItems => [...prevItems, newItem])

// Remove item
setItems(prevItems => prevItems.filter(item => item.id !== id))

// Update item
setItems(prevItems => 
    prevItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
    )
)

// Object state updates
const [user, setUser] = useState({ name: '', email: '' })

// Update single property
setUser(prevUser => ({ ...prevUser, name: 'John' }))

// Update multiple properties
setUser(prevUser => ({ ...prevUser, name: 'John', email: 'john@example.com' }))
```

### State from Our App
```javascript
// Form state in AddPostForm
function AddPostForm() {
    const {register, handleSubmit, formState: { errors, isValid, isDirty }, reset} = useForm({
        mode: 'onChange'
    })
    
    // React Hook Form manages form state internally
    // isDirty: form has been modified
    // isValid: form passes validation
    // errors: validation errors object
}

// Loading state from RTK Query
function PostsList() {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery()
    
    // RTK Query manages loading states automatically
}
```

---

## 🎣 Hooks

### What are Hooks?
Hooks are functions that let you use state and other React features in function components.

### Rules of Hooks
1. **Only call at top level** - Not inside loops, conditions, or nested functions
2. **Only call from React functions** - Components or custom hooks

### Built-in Hooks

#### useState
```javascript
const [state, setState] = useState(initialValue)

// Examples
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [user, setUser] = useState(null)
```

#### useEffect
```javascript
import { useEffect } from 'react'

// Effect with no dependencies (runs after every render)
useEffect(() => {
    document.title = `Count: ${count}`
})

// Effect with empty dependencies (runs once after mount)
useEffect(() => {
    fetchData()
}, [])

// Effect with dependencies (runs when dependencies change)
useEffect(() => {
    fetchUser(userId)
}, [userId])

// Effect with cleanup
useEffect(() => {
    const timer = setInterval(() => {
        setCount(c => c + 1)
    }, 1000)
    
    return () => clearInterval(timer) // Cleanup
}, [])
```

#### useContext
```javascript
import { createContext, useContext } from 'react'

// Create context
const ThemeContext = createContext()

// Provider
function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Header />
        </ThemeContext.Provider>
    )
}

// Consumer
function Header() {
    const theme = useContext(ThemeContext)
    return <header className={theme}>Header</header>
}
```

#### useReducer
```javascript
import { useReducer } from 'react'

// Reducer function
function counterReducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            return state
    }
}

// Component
function Counter() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 })
    
    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </div>
    )
}
```

#### useMemo
```javascript
import { useMemo } from 'react'

function ExpensiveComponent({ items, filter }) {
    // Expensive calculation only runs when dependencies change
    const filteredItems = useMemo(() => {
        return items.filter(item => item.category === filter)
    }, [items, filter])
    
    return (
        <ul>
            {filteredItems.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
    )
}
```

#### useCallback
```javascript
import { useCallback } from 'react'

function Parent({ items }) {
    // Function only recreated when dependencies change
    const handleClick = useCallback((id) => {
        // Handle click logic
    }, [])
    
    return (
        <div>
            {items.map(item => 
                <Child key={item.id} item={item} onClick={handleClick} />
            )}
        </div>
    )
}
```

### Custom Hooks
```javascript
// Custom hook for API calls
function useApi(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(error => {
                setError(error)
                setLoading(false)
            })
    }, [url])
    
    return { data, loading, error }
}

// Usage
function UserProfile({ userId }) {
    const { data: user, loading, error } = useApi(`/api/users/${userId}`)
    
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    return <div>Hello, {user.name}!</div>
}
```

### Hooks from Our App
```javascript
// Redux hooks
import { useSelector, useDispatch } from 'react-redux'

const users = useSelector(selectAllUsers)
const dispatch = useDispatch()

// RTK Query hooks
import { useGetPostsQuery, useAddNewPostMutation } from '../features/posts/postsSlice'

const { data, isLoading, error } = useGetPostsQuery()
const [addNewPost, { isLoading: isAdding }] = useAddNewPostMutation()

// React Router hooks
import { useNavigate, useParams } from 'react-router-dom'

const navigate = useNavigate()
const { postId } = useParams()

// Form hooks
import { useForm } from 'react-hook-form'

const { register, handleSubmit, formState: { errors } } = useForm()
```

---

## 🎯 Event Handling

### Basic Event Handling
```javascript
function Button() {
    const handleClick = () => {
        console.log('Button clicked!')
    }
    
    return <button onClick={handleClick}>Click me</button>
}

// Inline event handler
function Button() {
    return (
        <button onClick={() => console.log('Clicked!')}>
            Click me
        </button>
    )
}
```

### Event Object
```javascript
function Input() {
    const handleChange = (event) => {
        console.log('Input value:', event.target.value)
    }
    
    return <input onChange={handleChange} />
}

// Destructuring event properties
function Input() {
    const handleChange = ({ target: { value } }) => {
        console.log('Input value:', value)
    }
    
    return <input onChange={handleChange} />
}
```

### Passing Arguments to Event Handlers
```javascript
function TodoList({ todos }) {
    const handleDelete = (id) => {
        // Delete todo with id
    }
    
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={() => handleDelete(todo.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}
```

### Form Events
```javascript
function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '' })
    
    const handleSubmit = (event) => {
        event.preventDefault() // Prevent default form submission
        console.log('Form data:', formData)
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
            />
            <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```

### Events from Our App
```javascript
// Form submission in AddPostForm
const onSavePostClicked = async(postData) => {
    if (!isLoading) {
        try {
            await addNewPost({
                body: postData.content, 
                ...postData
            }).unwrap()
        } catch (error) {
            console.error('Failed to save the post', error)
        } finally {
            reset()
            navigate("/")
        }
    }
}

// Reaction click in ReactionsButton
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

## 🔀 Conditional Rendering

### if/else Statements
```javascript
function Greeting({ isLoggedIn }) {
    if (isLoggedIn) {
        return <h1>Welcome back!</h1>
    } else {
        return <h1>Please sign in.</h1>
    }
}
```

### Ternary Operator
```javascript
function Greeting({ isLoggedIn }) {
    return (
        <h1>
            {isLoggedIn ? 'Welcome back!' : 'Please sign in.'}
        </h1>
    )
}
```

### Logical && Operator
```javascript
function Mailbox({ unreadMessages }) {
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 && 
                <h2>You have {unreadMessages.length} unread messages.</h2>
            }
        </div>
    )
}
```

### Switch Statement
```javascript
function StatusMessage({ status }) {
    let message
    
    switch (status) {
        case 'loading':
            message = <div>Loading...</div>
            break
        case 'success':
            message = <div>Success!</div>
            break
        case 'error':
            message = <div>Error occurred</div>
            break
        default:
            message = <div>Unknown status</div>
    }
    
    return message
}
```

### Conditional Rendering from Our App
```javascript
// PostsList component
function PostsList() {
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery()
    const orderedPostIds = useSelector(selectPostIds)

    let content
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = orderedPostIds.map(postId => 
            <PostsExcerpt key={postId} postId={postId} />
        )
    } else if (isError) {
        content = <p>Error: {error}</p>
    }

    return <section>{content}</section>
}

// PostAuthor component
function PostAuthor({ userId }) {
    const author = useSelector(state => selectUserById(state, userId))
    return <span>by {author ? author.name : 'Unknown author'}</span>
}

// SinglePostPage component
function SinglePostPage() {
    const { postId } = useParams()
    const post = useSelector(state => selectPostById(state, postId))

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </article>
    )
}
```

---

## 📋 Lists and Keys

### Rendering Lists
```javascript
function NumberList({ numbers }) {
    const listItems = numbers.map(number => 
        <li key={number.toString()}>{number}</li>
    )
    
    return <ul>{listItems}</ul>
}

// Inline mapping
function NumberList({ numbers }) {
    return (
        <ul>
            {numbers.map(number => 
                <li key={number.toString()}>{number}</li>
            )}
        </ul>
    )
}
```

### Keys
Keys help React identify which items have changed, are added, or are removed.

```javascript
// ❌ Bad: Using array index as key
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map((todo, index) => 
                <li key={index}>{todo.text}</li>
            )}
        </ul>
    )
}

// ✅ Good: Using unique ID as key
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>{todo.text}</li>
            )}
        </ul>
    )
}
```

### Complex List Items
```javascript
function PostList({ posts }) {
    return (
        <div>
            {posts.map(post => (
                <article key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <span>By: {post.author}</span>
                </article>
            ))}
        </div>
    )
}
```

### Lists from Our App
```javascript
// PostsList renders list of post IDs
function PostsList() {
    const orderedPostIds = useSelector(selectPostIds)
    
    const content = orderedPostIds.map(postId => 
        <PostsExcerpt key={postId} postId={postId} />
    )
    
    return <section>{content}</section>
}

// UsersList renders list of users
function UsersList() {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>
                {user.name}
            </Link>
        </li>
    ))

    return (
        <section>
            <h2>Users</h2>
            <ul>{renderedUsers}</ul>
        </section>
    )
}

// ReactionsButton renders list of reaction buttons
function ReactionsButton({ post }) {
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
            key={name}
            type="button"
            onClick={() => reactionClicked(name)}
        >
            {emoji} {post.reactions[name]}
        </button>
    ))

    return <div>{reactionButtons}</div>
}
```

---

## 📝 Forms

### Controlled Components
```javascript
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Form submitted:', formData)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
            />
            <button type="submit">Submit</button>
        </form>
    )
}
```

### Uncontrolled Components
```javascript
import { useRef } from 'react'

function ContactForm() {
    const nameRef = useRef()
    const emailRef = useRef()
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Name:', nameRef.current.value)
        console.log('Email:', emailRef.current.value)
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input ref={nameRef} type="text" placeholder="Name" />
            <input ref={emailRef} type="email" placeholder="Email" />
            <button type="submit">Submit</button>
        </form>
    )
}
```

### Form Validation
```javascript
function LoginForm() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    
    const validate = () => {
        const newErrors = {}
        
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }
        
        return newErrors
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const newErrors = validate()
        
        if (Object.keys(newErrors).length === 0) {
            console.log('Form is valid:', formData)
        } else {
            setErrors(newErrors)
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
            
            <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Password"
            />
            {errors.password && <span className="error">{errors.password}</span>}
            
            <button type="submit">Login</button>
        </form>
    )
}
```

### Forms from Our App (React Hook Form)
```javascript
// AddPostForm using React Hook Form
function AddPostForm() {
    const [addNewPost, {isLoading}] = useAddNewPostMutation()
    
    const {register, handleSubmit, formState: { errors, isValid, isDirty }, reset} = useForm({
        mode: 'onChange'
    })
    
    const onSavePostClicked = async(postData) => {
        if (!isLoading) {
            try {
                await addNewPost({
                    body: postData.content, 
                    ...postData
                }).unwrap()
            } catch (error) {
                console.error('Failed to save the post', error)
            } finally {
                reset()
                navigate("/")
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSavePostClicked)}>
            <input
                type="text"
                {...register("title", {
                    required: 'Title is required',
                    minLength: {
                        value: 3,
                        message: 'Title must be at least 3 characters long'
                    },
                })}
            />
            {errors.title && <p>{errors.title.message}</p>}
            
            <select {...register("userId")}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            
            <textarea {...register("content")} />
            
            <button 
                type="submit"
                disabled={!isDirty || !isValid || isLoading}
            >
                Save Post
            </button>
        </form>
    )
}
```

---

## 🔄 Component Lifecycle

### Function Component Lifecycle (with Hooks)

#### Mounting (Component Creation)
```javascript
function MyComponent() {
    // Runs once after component mounts
    useEffect(() => {
        console.log('Component mounted')
        // Fetch initial data, set up subscriptions
    }, [])
    
    return <div>My Component</div>
}
```

#### Updating (Component Re-render)
```javascript
function MyComponent({ userId }) {
    // Runs after every render
    useEffect(() => {
        console.log('Component rendered')
    })
    
    // Runs when userId changes
    useEffect(() => {
        console.log('userId changed:', userId)
        fetchUserData(userId)
    }, [userId])
    
    return <div>User: {userId}</div>
}
```

#### Unmounting (Component Removal)
```javascript
function MyComponent() {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Timer tick')
        }, 1000)
        
        // Cleanup function (runs when component unmounts)
        return () => {
            console.log('Component unmounting')
            clearInterval(timer)
        }
    }, [])
    
    return <div>My Component</div>
}
```

### Class Component Lifecycle (Legacy)
```javascript
class MyComponent extends Component {
    // Mounting
    componentDidMount() {
        console.log('Component mounted')
        // Fetch data, set up subscriptions
    }
    
    // Updating
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userId !== this.props.userId) {
            console.log('userId changed')
            this.fetchUserData(this.props.userId)
        }
    }
    
    // Unmounting
    componentWillUnmount() {
        console.log('Component unmounting')
        // Cleanup subscriptions, timers
    }
    
    render() {
        return <div>My Component</div>
    }
}
```

### Lifecycle from Our App
```javascript
// UserPage component lifecycle
function UserPage() {
    const { userId } = useParams()
    
    // Fetch user's posts when userId changes
    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsByUserIdQuery(userId) // Automatically refetches when userId changes
    
    const user = useSelector(state => selectUserById(state, Number(userId)))
    
    // Component will re-render when:
    // 1. userId changes (from URL params)
    // 2. User data changes in Redux store
    // 3. Posts data changes from RTK Query
    
    return (
        <section>
            <h2>{user?.name}</h2>
            {/* Render posts */}
        </section>
    )
}
```

---

## 🌐 Context API

### Creating Context
```javascript
import { createContext, useContext, useState } from 'react'

// Create context
const ThemeContext = createContext()

// Custom hook for using context
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}

// Provider component
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light')
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
```

### Using Context
```javascript
// App component
function App() {
    return (
        <ThemeProvider>
            <Header />
            <Main />
        </ThemeProvider>
    )
}

// Header component
function Header() {
    const { theme, toggleTheme } = useTheme()
    
    return (
        <header className={`header ${theme}`}>
            <h1>My App</h1>
            <button onClick={toggleTheme}>
                Switch to {theme === 'light' ? 'dark' : 'light'} mode
            </button>
        </header>
    )
}

// Any nested component can access theme
function Button({ children }) {
    const { theme } = useTheme()
    
    return (
        <button className={`btn btn-${theme}`}>
            {children}
        </button>
    )
}
```

### Context Best Practices
```javascript
// Separate contexts for different concerns
const AuthContext = createContext()
const ThemeContext = createContext()
const LanguageContext = createContext()

// Combine providers
function AppProviders({ children }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}
```

---

## 🛣️ React Router

### Basic Setup
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    )
}
```

### Navigation
```javascript
import { Link, NavLink } from 'react-router-dom'

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            
            {/* NavLink adds 'active' class when route matches */}
            <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                Contact
            </NavLink>
        </nav>
    )
}
```

### Dynamic Routes
```javascript
function App() {
    return (
        <Routes>
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
    )
}

// Access route parameters
import { useParams } from 'react-router-dom'

function UserProfile() {
    const { userId } = useParams()
    
    return <div>User ID: {userId}</div>
}
```

### Nested Routes
```javascript
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="posts" element={<Posts />}>
                    <Route index element={<PostsList />} />
                    <Route path=":postId" element={<PostDetail />} />
                    <Route path="new" element={<NewPost />} />
                </Route>
            </Route>
        </Routes>
    )
}

// Layout component with Outlet
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet /> {/* Child routes render here */}
            </main>
        </div>
    )
}
```

### Programmatic Navigation
```javascript
import { useNavigate } from 'react-router-dom'

function LoginForm() {
    const navigate = useNavigate()
    
    const handleLogin = async (credentials) => {
        try {
            await login(credentials)
            navigate('/dashboard') // Redirect after login
        } catch (error) {
            console.error('Login failed')
        }
    }
    
    return (
        <form onSubmit={handleLogin}>
            {/* form fields */}
        </form>
    )
}
```

### Router from Our App
```javascript
// App.jsx - Route configuration
function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<PostsList />} />
                
                <Route path="post">
                    <Route index element={<AddPostForm />} />
                    <Route path=":postId" element={<SinglePostPage />} />
                    <Route path="edit/:postId" element={<EditPostForm />} />
                </Route>
                
                <Route path="user">
                    <Route index element={<UsersList />} />
                    <Route path=":userId" element={<UserPage />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    )
}

// SinglePostPage - Using route parameters
function SinglePostPage() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const post = useSelector(state => selectPostById(state, postId))
    
    const onDeletePostClicked = async () => {
        try {
            await deletePost({ id: post.id }).unwrap()
            navigate('/') // Redirect after deletion
        } catch (err) {
            console.error('Failed to delete the post', err)
        }
    }
    
    if (!post) {
        return <section><h2>Post not found!</h2></section>
    }
    
    return (
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <button onClick={onDeletePostClicked}>Delete Post</button>
        </article>
    )
}
```

---

## ⚡ Performance Optimization

### React.memo
```javascript
import { memo } from 'react'

// Component only re-renders if props change
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
    console.log('ExpensiveComponent rendered')
    return <div>{data.name}</div>
})

// Custom comparison function
const MyComponent = memo(function MyComponent({ user, posts }) {
    return <div>{user.name} has {posts.length} posts</div>
}, (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.user.id === nextProps.user.id && 
           prevProps.posts.length === nextProps.posts.length
})
```

### useMemo
```javascript
import { useMemo } from 'react'

function ProductList({ products, filter }) {
    // Expensive calculation only runs when dependencies change
    const filteredProducts = useMemo(() => {
        console.log('Filtering products...')
        return products.filter(product => 
            product.category === filter
        )
    }, [products, filter])
    
    return (
        <ul>
            {filteredProducts.map(product => 
                <li key={product.id}>{product.name}</li>
            )}
        </ul>
    )
}
```

### useCallback
```javascript
import { useCallback } from 'react'

function TodoList({ todos }) {
    // Function only recreated when dependencies change
    const handleToggle = useCallback((id) => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }, [])
    
    return (
        <ul>
            {todos.map(todo => 
                <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onToggle={handleToggle} 
                />
            )}
        </ul>
    )
}

// TodoItem won't re-render if onToggle function doesn't change
const TodoItem = memo(function TodoItem({ todo, onToggle }) {
    return (
        <li>
            <input 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            {todo.text}
        </li>
    )
})
```

### Code Splitting
```javascript
import { lazy, Suspense } from 'react'

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'))
const Profile = lazy(() => import('./Profile'))

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Suspense>
        </Router>
    )
}
```

### Performance from Our App
```javascript
// PostsExcerpt - Optimized rendering
function PostsExcerpt({ postId }) {
    // Only re-renders when this specific post changes
    const post = useSelector(state => selectPostById(state, postId))
    
    if (!post) {
        return <section><h2>Post not found!</h2></section>
    }
    
    return (
        <article>
            <h3>{post.title}</h3>
            <PostAuthor userId={post.userId} />
            <TimeAgo timestamp={post.date} />
            <ReactionsButton post={post} />
        </article>
    )
}

// PostsList - Renders only post IDs, not full post data
function PostsList() {
    const orderedPostIds = useSelector(selectPostIds) // Only IDs, not full posts
    
    const content = orderedPostIds.map(postId => 
        <PostsExcerpt key={postId} postId={postId} />
    )
    
    return <section>{content}</section>
}
```

---

## 🧪 Testing

### Testing Library Setup
```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Counter from './Counter'

test('renders counter with initial value', () => {
    render(<Counter initialValue={0} />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
})

test('increments counter when button clicked', () => {
    render(<Counter initialValue={0} />)
    
    const button = screen.getByText('Increment')
    fireEvent.click(button)
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
})
```

### Testing Hooks
```javascript
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

test('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0))
    
    act(() => {
        result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
})
```

### Testing with Context
```javascript
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from './ThemeContext'
import ThemedButton from './ThemedButton'

test('renders button with theme', () => {
    render(
        <ThemeProvider>
            <ThemedButton>Click me</ThemedButton>
        </ThemeProvider>
    )
    
    expect(screen.getByRole('button')).toHaveClass('btn-light')
})
```

### Testing Async Operations
```javascript
import { render, screen, waitFor } from '@testing-library/react'
import UserProfile from './UserProfile'

// Mock API call
jest.mock('./api', () => ({
    fetchUser: jest.fn(() => Promise.resolve({ name: 'John Doe' }))
}))

test('displays user name after loading', async () => {
    render(<UserProfile userId={1} />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    
    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
})
```

---

## 🎯 Best Practices

### Component Design
```javascript
// ✅ Good: Single responsibility
function UserAvatar({ user, size = 'medium' }) {
    return (
        <img 
            src={user.avatar} 
            alt={user.name}
            className={`avatar avatar-${size}`}
        />
    )
}

// ❌ Bad: Multiple responsibilities
function UserCard({ user }) {
    // Handles display, API calls, and state management
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        fetchUserPosts(user.id).then(setPosts)
    }, [user.id])
    
    return (
        <div>
            <img src={user.avatar} alt={user.name} />
            <h3>{user.name}</h3>
            <div>Posts: {posts.length}</div>
        </div>
    )
}
```

### State Management
```javascript
// ✅ Good: Minimal state
function TodoList() {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all')
    
    // Derived state (computed from existing state)
    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed
        if (filter === 'active') return !todo.completed
        return true
    })
    
    return <div>{/* render filteredTodos */}</div>
}

// ❌ Bad: Redundant state
function TodoList() {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all')
    const [filteredTodos, setFilteredTodos] = useState([]) // Redundant!
    
    useEffect(() => {
        // Manually sync derived state
        setFilteredTodos(todos.filter(/* filter logic */))
    }, [todos, filter])
}
```

### Props Design
```javascript
// ✅ Good: Specific props
function Button({ onClick, disabled, variant = 'primary', children }) {
    return (
        <button 
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${variant}`}
        >
            {children}
        </button>
    )
}

// ❌ Bad: Generic props object
function Button({ config }) {
    return (
        <button 
            onClick={config.onClick}
            disabled={config.disabled}
            className={`btn btn-${config.variant || 'primary'}`}
        >
            {config.text}
        </button>
    )
}
```

### Error Boundaries
```javascript
import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }
    
    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>
        }
        
        return this.props.children
    }
}

// Usage
function App() {
    return (
        <ErrorBoundary>
            <Header />
            <Main />
        </ErrorBoundary>
    )
}
```

---

## 🎤 Interview Questions

### Basic Questions

**Q: What is React?**
A: React is a JavaScript library for building user interfaces. It's component-based, uses a virtual DOM for efficient updates, and follows a declarative programming paradigm.

**Q: What is JSX?**
A: JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to write HTML-like code in JavaScript, which gets transpiled to React.createElement() calls.

**Q: What's the difference between functional and class components?**
A: Functional components are simpler, use hooks for state and lifecycle, and are the modern approach. Class components use this.state and lifecycle methods, but are considered legacy.

**Q: What are props?**
A: Props are read-only inputs passed to components. They allow data to flow from parent to child components and make components reusable.

**Q: What is state?**
A: State is data that can change over time. When state changes, React re-renders the component to reflect the new state.

### Intermediate Questions

**Q: What are React hooks?**
A: Hooks are functions that let you use state and other React features in functional components. Common hooks include useState, useEffect, useContext, etc.

**Q: Explain useEffect hook.**
A: useEffect lets you perform side effects in functional components. It can run after every render, only once, or when specific dependencies change. It can also return a cleanup function.

**Q: What is the virtual DOM?**
A: The virtual DOM is a JavaScript representation of the real DOM. React uses it to efficiently update the UI by comparing (diffing) the new virtual DOM with the previous one and only updating what changed.

**Q: What are keys in React lists?**
A: Keys help React identify which list items have changed, been added, or removed. They should be unique and stable identifiers, not array indices.

**Q: What is prop drilling?**
A: Prop drilling is passing props through multiple component layers to reach a deeply nested component. It can be solved using Context API or state management libraries.

### Advanced Questions

**Q: What is React.memo and when would you use it?**
A: React.memo is a higher-order component that memoizes the result. It only re-renders if props change. Use it for expensive components that receive the same props frequently.

**Q: Explain useMemo and useCallback.**
A: useMemo memoizes expensive calculations, useCallback memoizes functions. Both help prevent unnecessary re-renders and computations when dependencies haven't changed.

**Q: What are error boundaries?**
A: Error boundaries are React components that catch JavaScript errors in their child component tree, log errors, and display fallback UI instead of crashing the entire app.

**Q: How do you optimize React performance?**
A: Use React.memo, useMemo, useCallback, code splitting with lazy loading, avoid inline objects/functions in JSX, use proper keys, and minimize state updates.

**Q: What is the difference between controlled and uncontrolled components?**
A: Controlled components have their form data handled by React state. Uncontrolled components store form data in the DOM itself, accessed via refs.

### Code-based Questions

**Q: Fix this component:**
```javascript
// Problem: Infinite re-renders
function BadComponent() {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        setCount(count + 1)
    })
    
    return <div>{count}</div>
}
```

**A: Solution:**
```javascript
function GoodComponent() {
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        setCount(prev => prev + 1)
    }, []) // Add empty dependency array
    
    return <div>{count}</div>
}
```

**Q: What's wrong with this code?**
```javascript
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map((todo, index) => 
                <li key={index}>{todo.text}</li>
            )}
        </ul>
    )
}
```

**A: Using array index as key can cause issues when list order changes. Use unique IDs:**
```javascript
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => 
                <li key={todo.id}>{todo.text}</li>
            )}
        </ul>
    )
}
```

### Scenario-based Questions

**Q: How would you handle authentication in a React app?**
A: Use Context API or state management library to store auth state, protect routes with higher-order components or custom hooks, store tokens securely, and handle token refresh.

**Q: How do you handle API calls in React?**
A: Use useEffect for component-level calls, custom hooks for reusable logic, libraries like RTK Query or SWR for advanced caching, and handle loading/error states properly.

**Q: How would you implement a search feature?**
A: Use controlled input for search term, debounce API calls to avoid excessive requests, show loading states, handle empty results, and consider client-side filtering for small datasets.

---

This comprehensive React guide covers everything from basics to advanced concepts with practical examples from your application. Use it for learning, revision, and interview preparation. Each section builds upon previous concepts and includes real-world patterns you'll encounter in React development.