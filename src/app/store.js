import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../feature/usersSlice";
import postsReducer from "../feature/postsSlice";
import commentaireReducer from "../feature/commentairesSlice";
import connexionsReducer from "../feature/connexionSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    connexions: connexionsReducer,
    commentaires: commentaireReducer,
  },
});
