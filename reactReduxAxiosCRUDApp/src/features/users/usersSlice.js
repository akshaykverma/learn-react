import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    console.log(response.data);
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {

            // here we are directly overiding the data
            // for initialState 
            return action.payload;
        })
    }
})

// exporting the posts from the state itself 
// so that if in future the name of state (posts) changes, 
// we can just change it here
export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
