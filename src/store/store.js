// Create Redux toolkit store
import { configureStore } from "@reduxjs/toolkit";

// Import Reducers
import { counterReducer, usersReducer, postsReducer } from "../features/slices";
import { apiSlice } from "../features/api/apiSlice";

// Create Redux store with Toolkit
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    posts: postsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

