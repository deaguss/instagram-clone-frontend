import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";


export const getALLComments = createAsyncThunk('user/post/get_all_comment', async()=> {
    try {
        const response = await axios.get(`${process.env.REACT_APP_PORT_GET_COMMENT}`);
        return response.data;
    } catch (error) {
        return console.log(error.message)
    }
});

export const createComments = createAsyncThunk('user/post/create_comment', async({ postId, comments })=> {
    try {
        const response = await axios.post(`${process.env.REACT_APP_PORT_POST_COMMENT_BY_ID}/${postId}`, {
            comments
        });
        return response.data;
    } catch (error) {
        return console.log(error.message)
    }
});

const commentEntity = createEntityAdapter({
    selectId: (comment) => comment.uuid
});

const commentSlice = createSlice({
    name: 'comment',
    initialState: commentEntity.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createComments.fulfilled, (state, action) => {
                const { create } = action.payload;
                if (create && create.uuid) {
                    commentEntity.addOne(state, { uuid: create.uuid, ...action.payload });
                }
            })
            .addCase(getALLComments.fulfilled, (state, action) => {
                commentEntity.setAll(state, action.payload);
            });
    },
});

export const commentSelector = commentEntity.getSelectors(state => state.commentUsers);
export default commentSlice.reducer;