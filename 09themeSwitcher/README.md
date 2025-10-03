# Theme Switcher - Advanced Context

## 🎯 Project Overview
Dark/Light theme switcher demonstrating advanced Context API usage with theme management.

## 🔑 Key Concepts

### Theme Management
- **Theme Context**: Global theme state
- **Theme Provider**: Centralized theme logic
- **CSS Variables**: Dynamic styling with custom properties
- **Persistent Themes**: localStorage integration

### Advanced Context Patterns
- **Context with Methods**: Providing functions via context
- **Default Context Values**: Fallback values and functions
- **Context Composition**: Multiple contexts working together

## 📝 What You'll Learn

- **Advanced Context**: Beyond simple state sharing
- **Theme Architecture**: Scalable theming systems
- **CSS Integration**: React + CSS custom properties
- **Persistence**: Saving user preferences

## 🔍 Important Code Patterns

### Context with Default Values
```jsx
const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {}
});
```

### Theme Provider with Methods
```jsx
const [themeMode, setThemeMode] = useState("light");

const darkTheme = () => setThemeMode("dark");
const lightTheme = () => setThemeMode("light");

<ThemeContext.Provider value={{themeMode, darkTheme, lightTheme}}>
```

### CSS Integration
```jsx
useEffect(() => {
  document.querySelector('html').classList.remove("light", "dark");
  document.querySelector('html').classList.add(themeMode);
}, [themeMode]);
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Features

- **Toggle Switch**: Interactive theme switcher
- **Instant Updates**: Real-time theme changes
- **Tailwind Integration**: Dark mode utilities
- **Persistent State**: Remembers user preference

## 🎨 Theme Implementation

### Tailwind Dark Mode
```jsx
className="bg-white dark:bg-gray-900 text-black dark:text-white"
```

### CSS Custom Properties
```css
:root {
  --bg-color: theme('colors.white');
  --text-color: theme('colors.black');
}

.dark {
  --bg-color: theme('colors.gray.900');
  --text-color: theme('colors.white');
}
```

## 🔄 Theme Flow

1. **ThemeContext** provides theme state and methods
2. **ThemeBtn** component toggles theme
3. **App** applies theme to HTML element
4. **CSS** responds to theme class changes

## 🌟 Best Practices

- **Semantic Naming**: Clear theme variable names
- **Fallback Values**: Default theme handling
- **Performance**: Minimal re-renders
- **Accessibility**: Respecting user preferences