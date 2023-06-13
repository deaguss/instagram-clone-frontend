import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
}

export const userLogin = createAsyncThunk('user/login', async(users, thunkApi) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_PORT_LOGIN}`, {
                email: users.email,
                username: users.username,
                phone_number: users.phone_number,
                password: users.password
            });
        return response.data;
    } catch (e) {
        if(e.response){
            const message = e.response.data.msg;
            return thunkApi.rejectWithValue(message)
        }
    }
})

export const getMe = createAsyncThunk('user/getMe', async(users, thunkApi) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_PORT_ME}`)
        return response.data;
    } catch (e) {
        if(e.response){
            const message = e.response.data.msg;
            return thunkApi.rejectWithValue(message);
        }
    }
})


export const logOut = createAsyncThunk('user/logout', async()=> {
    await axios.delete(`${process.env.REACT_APP_PORT_LOGOUT}`);
})


export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        reset: (state) => initialState 
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.users = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
    }
})



export const { reset } = authSlice.actions;
export default authSlice.reducer;
