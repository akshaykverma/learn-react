import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        auth : authReducer,
        
        //TODO: add more slices for posts 
        //post : postSlice
    }
});

export default store;