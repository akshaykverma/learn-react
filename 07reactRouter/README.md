# React Router - Client-Side Routing

## 🎯 Project Overview
Multi-page application demonstrating React Router for client-side navigation.

## 🔑 Key Concepts

### React Router
- **Client-Side Routing**: Navigation without page refresh
- **Route Configuration**: Defining URL patterns
- **Nested Routes**: Hierarchical routing structure
- **Route Parameters**: Dynamic URL segments

### Navigation Components
- **Link Component**: Declarative navigation
- **NavLink**: Active state styling
- **useNavigate Hook**: Programmatic navigation
- **useParams Hook**: Accessing route parameters

## 📝 What You'll Learn

- **SPA Navigation**: Single Page Application routing
- **Route Protection**: Conditional route access
- **URL Parameters**: Dynamic route handling
- **Navigation Patterns**: User-friendly navigation

## 🔍 Important Code Patterns

### Route Configuration
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/user/:id" element={<User />} />
</Routes>
```

### Navigation Links
```jsx
<NavLink 
  to="/about"
  className={({isActive}) => 
    isActive ? "text-orange-700" : "text-gray-700"
  }
>
  About
</NavLink>
```

### Route Parameters
```jsx
function User() {
  const {id} = useParams();
  return <div>User ID: {id}</div>;
}
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Features

- **Multiple Pages**: Home, About, Contact, User profiles
- **Dynamic Routes**: User-specific pages
- **Active Navigation**: Visual feedback for current page
- **GitHub Integration**: Fetching user data from GitHub API

## 🗺️ Route Structure

```
/                 → Home page
/about           → About page  
/contact         → Contact page
/user/:userid    → Dynamic user page
/github          → GitHub user info
```

## 🎨 Navigation Features

- **Responsive Header**: Mobile-friendly navigation
- **Active States**: Highlighted current page
- **Footer Links**: Additional navigation options
- **External Links**: GitHub profile integration