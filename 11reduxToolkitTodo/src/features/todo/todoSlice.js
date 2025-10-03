import {createSlice, nanoid} from '@reduxjs/toolkit'

/**
 * Redux Toolkit Initial State
 * 
 * Defines the shape and default values of this slice's state
 * Can contain any data type: objects, arrays, primitives
 */
const initialState = {
    // Array of todo items - main application data
    todos: [{
        id: 1,
        text: "Hello world"
    }],
    
    // UI state: controls add/update button behavior
    // true = add mode, false = update mode
    toggleAddUpdateBtn: true,

    // Temporary storage for todo being edited
    // Holds todo data when switching to update mode
    updatedTodoData: {}
}

/**
 * Slice contains all the reducer logics and actions for a single feature.
 * It’s a way to group all the code for a particular feature or domain, including its reducers, action creators, and selectors, in one place.
 * 
 * state -> Redux maintains a single global state object that represents the entire state of your application. 
	- This state is the “single source of truth” for your app, meaning that any piece of data that needs to be 
      shared across components or persisted between sessions should live here. 
	- State in Redux is read-only. You can’t modify it directly.
	- Instead, you use actions to describe changes, and reducers to create a new state object with those changes applied. 
	- This ensures that state updates are predictable and easier to track and debug.
 * 
 * action ->  Actions are JavaScript objects that represent an intention to change 
 * the state. Means the modified data is sent in the action payload 
 * They have a type property that indicates 
 * the type of action being performed and a payload that 
 * carries the data necessary for the state update2.
 * 
 * Reducers -> Reducers are pure functions that take the current state 
 * and an action as arguments and return a new state. 
 * They specify how the application’s state changes in response 
 * to actions sent to the store3.
 */
export const todoSlice = createSlice({
    name: 'todo', // Slice name - used in action types
    initialState,
    reducers: {
        // Add new todo to the list
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(), // Generate unique ID
                text: action.payload // Todo text from component
            }
            // RTK uses Immer - direct mutation is safe here
            state.todos.push(todo);
        },
        
        // Remove todo by ID
        removeTodo: (state, action) => {
            // Filter out todo with matching ID
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        
        // Update existing todo
        updateTodo: (state, action) => {
            // Replace todo with same ID, keep others unchanged
            state.todos = state.todos.map(todo => 
                todo.id === action.payload.id ? action.payload : todo
            );
        },
        
        // Toggle between add/update modes
        toggleAddUpdateBtnState: (state, action) => {
            state.toggleAddUpdateBtn = !state.toggleAddUpdateBtn;
        },
        
        // Store todo data for editing
        setDataToUpdateTodo(state, action) {
            state.updatedTodoData = action.payload;
        }
    }
})

// exporting all the functionalities (reducers)
export const {addTodo, removeTodo, updateTodo, toggleAddUpdateBtnState, setDataToUpdateTodo} = todoSlice.actions;

// to provide the visibility of all reducers to the store
export default todoSlice.reducer;