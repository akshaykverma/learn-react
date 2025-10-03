# Counter App - React State Management

## 🎯 Project Overview
Interactive counter application demonstrating React state management with useState hook.

## 🔑 Key Concepts

### useState Hook
- **State Declaration**: `const [state, setState] = useState(initialValue)`
- **State Updates**: Triggers component re-render
- **Functional Updates**: Using previous state value
- **State Immutability**: Never mutate state directly

### Event Handling
- **onClick Events**: Handling user interactions
- **Function References**: Passing functions vs calling them
- **Event Binding**: Automatic binding in functional components

## 📝 What You'll Learn

- **React Hooks**: Introduction to useState
- **State Management**: Local component state
- **Re-rendering**: How state changes trigger UI updates
- **Functional Updates**: `setState(prevState => newState)`
- **Conditional Logic**: Boundary checks in state updates

## 🔍 Important Code Patterns

### Functional State Updates
```jsx
// ✅ Correct - uses previous state
setCounter(prevCounter => prevCounter + 1);

// ❌ Incorrect - uses stale closure
setCounter(counter + 1);
```

### Boundary Conditions
```jsx
// Prevent negative values
if (counter > 0) {
  setCounter(counter - 1);
}
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Takeaways

- State is the single source of truth
- UI automatically updates when state changes
- Always use setter function to update state
- Functional updates prevent stale closure issues