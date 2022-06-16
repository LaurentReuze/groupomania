import { createSlice } from "@reduxjs/toolkit";

export const commentairesSlice = createSlice({
  name: "commentaires",
  initialState: {
    commentaires: null,
  },
  reducers: {
    setCommentairesData: (state, { payload }) => {
      state.commentaires = payload;
    },
  },
});

export const { setCommentairesData } = commentairesSlice.actions;
export default commentairesSlice.reducer;
