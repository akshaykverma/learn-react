import {createSlice, nanoid} from '@reduxjs/toolkit'

// store's initial state / data which can be anything
const initialState = {
    todos: [{
        id: 1,
        text: "Hello world"
    }],
    // used to toggle between add or update todo button and its functionality
    // true -> add 
    toggleAddUpdateBtn: true,

    //refers to the data sent from Todos to AddTodo component
    // data set is an updated todo data
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
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => {
            state.todos =  state.todos.map(todo => (todo.id === action.payload.id ? action.payload: todo));
        },
        toggleAddUpdateBtnState: (state, action) => {
            state.toggleAddUpdateBtn = !state.toggleAddUpdateBtn;
        },
        setDataToUpdateTodo(state, action) {
            state.updatedTodoData = action.payload;
        }

    }
})

// exporting all the functionalities (reducers)
export const {addTodo, removeTodo, updateTodo, toggleAddUpdateBtnState, setDataToUpdateTodo} = todoSlice.actions;

// to provide the visibility of all reducers to the store
export default todoSlice.reducer;