# Todo Context Local - Context + localStorage

## 🎯 Project Overview
Full-featured todo application combining Context API with localStorage for data persistence.

## 🔑 Key Concepts

### Context + localStorage
- **Data Persistence**: Saving todos across sessions
- **Context Integration**: Global state with local storage
- **Synchronization**: Keeping context and storage in sync

### Todo Management
- **CRUD Operations**: Create, Read, Update, Delete todos
- **State Management**: Complex state with multiple operations
- **Component Communication**: Context-based data flow

## 📝 What You'll Learn

- **Persistent State**: Data that survives page refresh
- **Complex Context**: Multiple context methods
- **Local Storage**: Browser storage integration
- **Component Architecture**: Modular todo components

## 🔍 Important Code Patterns

### Context with Multiple Methods
```jsx
const TodoContext = createContext({
  todos: [],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {}
});
```

### localStorage Integration
```jsx
useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos && todos.length > 0) {
    setTodos(todos);
  }
}, []);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

### Todo Operations
```jsx
const addTodo = (todo) => {
  setTodos((prev) => [{id: Date.now(), ...todo}, ...prev]);
}

const updateTodo = (id, todo) => {
  setTodos((prev) => prev.map((prevTodo) => 
    prevTodo.id === id ? todo : prevTodo
  ));
}
```

## 📁 Component Structure
```
src/
├── contexts/
│   ├── TodoContext.js    # Context definition
│   └── index.js          # Context exports
├── components/
│   ├── TodoForm.jsx      # Add todo form
│   ├── TodoItem.jsx      # Individual todo
│   └── index.js          # Component exports
└── App.jsx               # Main app with provider
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

## 💡 Key Features

- **Add Todos**: Create new todo items
- **Edit Todos**: Inline editing capability
- **Toggle Complete**: Mark todos as done
- **Delete Todos**: Remove unwanted items
- **Persistent Storage**: Data survives browser refresh

## 🔄 Data Flow

1. **TodoContext** manages all todo state
2. **TodoForm** adds new todos via context
3. **TodoItem** displays and modifies individual todos
4. **localStorage** automatically syncs with context state

## 🎯 Architecture Benefits

- **Separation of Concerns**: Context handles state, components handle UI
- **Reusable Components**: TodoItem can be used anywhere
- **Centralized Logic**: All todo operations in one place
- **Persistent Data**: User data preserved across sessions