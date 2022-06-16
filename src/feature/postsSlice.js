import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  },
  reducers: {
    setPostsData: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.push(payload);
    },
    updatePost: (state, action) => {
      const post = state.find((p) => p.id === action.payload);
      post.done = !post.done;
    },
    deletePost: (state, action) => {
      console.log(state.posts);
      // return state.filter((posts) => posts.id !== action.payload);
    },
  },
});

export const { setPostsData, updatePost, deletePost, addPost } =
  postsSlice.actions;
export default postsSlice.reducer;
