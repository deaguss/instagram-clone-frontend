import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllProfileUsers = createAsyncThunk('user/profile/get_all_profile', async() =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_PORT_GET_PROFILE}`)
        return response.data;
    } catch (error) {
        return console.log(error.message)
    }
});

const profileEntity = createEntityAdapter({
    selectId: (profile) => profile.uuid
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: profileEntity.getInitialState(),
    extraReducers: {
        [getAllProfileUsers.fulfilled] : (state, action) => {
            profileEntity.setAll(state, action.payload)
        }
    }
})

export const profileSelector = profileEntity.getSelectors(state => state.profileUsers);
export default profileSlice.reducer;