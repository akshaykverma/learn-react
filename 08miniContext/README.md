# Mini Context - Context API Basics

## 🎯 Project Overview
Simple user authentication flow demonstrating React Context API for state sharing.

## 🔑 Key Concepts

### Context API
- **Global State**: Sharing data across component tree
- **Provider Pattern**: Wrapping components with data
- **Consumer Pattern**: Accessing context data
- **Avoiding Prop Drilling**: Direct data access

### Authentication Flow
- **Login State**: User authentication status
- **State Persistence**: Maintaining login across components
- **Conditional Rendering**: UI based on auth state

## 📝 What You'll Learn

- **Context Creation**: Creating and configuring context
- **Provider Setup**: Wrapping app with context provider
- **Context Consumption**: Using useContext hook
- **State Management**: Global state without Redux

## 🔍 Important Code Patterns

### Context Creation
```jsx
// UserContext.js
const UserContext = createContext();
export default UserContext;
```

### Provider Component
```jsx
<UserContext.Provider value={{user, setUser}}>
  {children}
</UserContext.Provider>
```

### Context Consumption
```jsx
const {user, setUser} = useContext(UserContext);
```

## 📁 Project Structure
```
src/
├── context/
│   ├── UserContext.js          # Context definition
│   └── UserContextProvider.jsx # Provider component
├── components/
│   ├── Login.jsx               # Login form
│   └── Profile.jsx             # User profile
└── App.jsx                     # Main app with provider
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Features

- **Login Form**: Username/password input
- **Profile Display**: Show logged-in user info
- **Logout Functionality**: Clear user session
- **Conditional UI**: Different views for auth states

## 🔄 Data Flow

1. **UserContextProvider** manages user state
2. **Login** component updates user context
3. **Profile** component reads user context
4. **App** conditionally renders based on auth state

## 🎯 When to Use Context

- **Global State**: Data needed by many components
- **Theme Management**: App-wide styling
- **User Authentication**: Login status
- **Language Settings**: Internationalization