# Tailwind Props - Component Reusability

## 🎯 Project Overview
Reusable card component demonstrating props usage and Tailwind CSS integration.

## 🔑 Key Concepts

### Props (Properties)
- **Data Flow**: Parent to child component communication
- **Destructuring**: `{username, btnText}` syntax
- **Default Values**: `btnText="visit"` fallback
- **Immutability**: Props are read-only

### Tailwind CSS
- **Utility Classes**: Pre-built CSS classes
- **Responsive Design**: Mobile-first approach
- **Component Styling**: Utility-first methodology

## 📝 What You'll Learn

- **Component Reusability**: Creating flexible components
- **Props Patterns**: Destructuring and defaults
- **Tailwind Integration**: Utility-first CSS
- **Design Systems**: Consistent styling approach

## 🔍 Important Code Patterns

### Props Destructuring with Defaults
```jsx
function Card({username, btnText="visit"}) {
  // btnText defaults to "visit" if not provided
}
```

### Dynamic Content
```jsx
<h1>{username}</h1>  {/* Dynamic from props */}
<button>{btnText}</button>  {/* With fallback */}
```

### Tailwind Utility Classes
```jsx
className="relative h-[400px] w-[300px] rounded-md"
// relative: position relative
// h-[400px]: custom height
// w-[300px]: custom width  
// rounded-md: border radius
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Benefits

- **Reusable Components**: One component, multiple uses
- **Flexible Design**: Props make components adaptable
- **Rapid Styling**: Tailwind's utility classes
- **Maintainable Code**: Separation of concerns