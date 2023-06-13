import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPostUsers = createAsyncThunk('user/post/get_all_Post', async() =>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_PORT_GET_POST}`)
        return response.data;
    } catch (error) {
        return console.log(error.message)
    }
});

export const getPostUsersById = createAsyncThunk('user/post/get_all_post_by_id',async({ id }) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_PORT_GET_POST_BY_ID}/${id}`);
        return response.data;
    } catch (error) {
        return console.log(error.message)
    }
});

export const createPosts = createAsyncThunk('user/post/create', async({ formData }, thunkApi) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_PORT_POSTING_USERS}`, formData, {
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    if(error.response){
      const message = error.response.data.msg;
      return thunkApi.rejectWithValue(message)
    }
  }
});


const postEntity = createEntityAdapter({
    selectId: (post) => post.uuid
});


const postSlice = createSlice({
    name: 'post',
    initialState: postEntity.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllPostUsers.fulfilled, (state, action) => {
          postEntity.setAll(state, action.payload);
        })
        .addCase(getPostUsersById.fulfilled, (state, action) => {
          const post = state.entities[action.payload.uuid];
          if (post) {
            postEntity.updateOne(state, { id: post.id, changes: action.payload });
          } else {
            postEntity.addOne(state, action.payload);
          }
        })
        .addCase(createPosts.fulfilled, (state, action) => {
          const { create } = action.payload;
          if (create && create.uuid) {
              postEntity.addOne(state, { uuid: create.uuid, ...action.payload });
          }
        })
    },
  });

export const postSelector = postEntity.getSelectors(state => state.postUsers);
export default postSlice.reducer;