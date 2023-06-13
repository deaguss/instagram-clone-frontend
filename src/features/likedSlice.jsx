import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

export const doLikePost = createAsyncThunk(
  "user/post/like_post",
  async ({ postId, like }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PORT_LIKE_POST_BY_ID}/${postId}`,
        { like }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchPostStatus = createAsyncThunk(
  'posts/fetchStatus',
  async (postId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_PORT_LIKE_POST_BY_ID}/${postId}`
    );
    return response.data;
  }
);

export const deleteLiked = createAsyncThunk(
  "user/post/cancel_like",
  async ({ deleteId }) => {
    try {
      await axios.delete(`${process.env.REACT_APP_PORT_DELETE_LIKE}/${deleteId}`);
    } catch (error) {
      throw error;
    }
  }
);

const likeEntity = createEntityAdapter({
  selectId: (post) => post.uuid,
});

const likeSlice = createSlice({
  name: "like",
  initialState: likeEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doLikePost.fulfilled, (state, action) => {
        likeEntity.upsertOne(state, action.payload);
      })
      .addCase(deleteLiked.fulfilled, (state, action) => {
        likeEntity.removeOne(state, action.payload);
      })
      .addCase(fetchPostStatus.fulfilled, (state, action) => {
        likeEntity.setAll(state, action.payload);
      });
  },
});

export const likeSelector = likeEntity.getSelectors(
  (state) => state.likePostUsers
);
export default likeSlice.reducer;