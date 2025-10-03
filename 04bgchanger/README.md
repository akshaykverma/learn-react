# Background Changer - Dynamic Styling

## 🎯 Project Overview
Interactive background color changer demonstrating dynamic styling and event handling in React.

## 🔑 Key Concepts

### Dynamic Styling
- **Inline Styles**: JavaScript objects for CSS
- **Conditional Styling**: Style based on state
- **CSS-in-JS**: Dynamic style generation

### Event Handling
- **Multiple Event Handlers**: Different buttons, different actions
- **Event Delegation**: Efficient event management
- **State-Driven UI**: UI reflects current state

## 📝 What You'll Learn

- **Dynamic CSS**: Changing styles programmatically
- **Color Management**: Working with color values
- **User Interaction**: Responsive UI design
- **State Visualization**: Visual feedback from state changes

## 🔍 Important Code Patterns

### Dynamic Background Styling
```jsx
<div style={{backgroundColor: color}}>
  {/* Background changes based on state */}
</div>
```

### Event Handler Functions
```jsx
const changeColor = (newColor) => {
  setColor(newColor);
}

<button onClick={() => changeColor('red')}>
  Red
</button>
```

### Tailwind with Dynamic Values
```jsx
className={`px-4 py-2 rounded-full text-white shadow-lg`}
style={{backgroundColor: 'red'}}
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Features

- **Instant Feedback**: Immediate visual response
- **Multiple Options**: Various color choices
- **Smooth Transitions**: CSS transitions for smooth changes
- **Accessible Design**: Clear visual indicators

## 🎨 Styling Techniques

- Combining Tailwind utilities with inline styles
- Using CSS custom properties for dynamic values
- Responsive design with utility classes
- Shadow and border effects for visual appeal