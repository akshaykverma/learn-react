# Password Generator - Advanced Hooks

## 🎯 Project Overview
Secure password generator demonstrating useEffect, useCallback, and useRef hooks.

## 🔑 Key Concepts

### useEffect Hook
- **Side Effects**: Operations outside component rendering
- **Dependency Array**: Control when effects run
- **Cleanup**: Preventing memory leaks

### useCallback Hook
- **Memoization**: Caching function references
- **Performance**: Preventing unnecessary re-renders
- **Dependencies**: When to recreate functions

### useRef Hook
- **DOM References**: Direct DOM element access
- **Mutable Values**: Values that don't trigger re-renders
- **Focus Management**: Programmatic focus control

## 📝 What You'll Learn

- **Advanced Hooks**: Beyond useState
- **Performance Optimization**: Memoization techniques
- **DOM Manipulation**: Direct element access
- **Algorithm Implementation**: Password generation logic

## 🔍 Important Code Patterns

### useCallback for Performance
```jsx
const generatePassword = useCallback(() => {
  // Function only recreated when dependencies change
}, [length, includeNumbers, includeSymbols]);
```

### useRef for DOM Access
```jsx
const passwordRef = useRef(null);

const copyToClipboard = () => {
  passwordRef.current?.select();
  document.execCommand('copy');
}
```

### useEffect for Side Effects
```jsx
useEffect(() => {
  generatePassword();
}, [length, includeNumbers, includeSymbols, generatePassword]);
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Features

- **Customizable Length**: Adjustable password length
- **Character Options**: Numbers, symbols, letters
- **Copy to Clipboard**: One-click copying
- **Real-time Generation**: Updates as options change

## 🔒 Security Considerations

- Client-side generation only
- No password storage
- Cryptographically secure randomization
- User control over complexity