import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'

export const store = configureStore({
    // in order for store to know about the data, it needs to 
    // be aware of the available reducers
    reducer: todoReducer
});