// postsSlice.js
import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
// date
import { sub } from "date-fns";
import { nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_BASEURL = "https://jsonplaceholder.typicode.com/posts";

// fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_BASEURL);
    return response.data;
  } catch (error) {
    return error;
  }
});

// new post
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (newPost) => {
    try {
      const response = await axios.post(POSTS_BASEURL, newPost);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

// edit post
export const editPost = createAsyncThunk("posts/editPost", async (post) => {
  try {
    const response = await axios.put(`${POSTS_BASEURL}/${post.id}`, post);
    return response.data;
  } catch (error) {
    return error;
  }
});

// delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    try {
      const response = await axios.delete(`${POSTS_BASEURL}/${postId}`);
      if (response.status === 200) return postId;
      return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
      return error;
    }
  }
);

// For more information on createEntityAdapter, rendering lists, and normalizing state shape, see the following links:
// https://redux-toolkit.js.org/api/createEntityAdapter
// https://redux-toolkit.js.org/api/createEntityAdapter#adapter-methods
// https://redux.js.org/usage/structuring-reducers/normalizing-state-shape
const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id, // this is the default, but we can override it, which is unique and key for each entity
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
  count: 0,
});

// {
//     id: 2,
//     title: "Second Post",
//     body: "More text",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       like: 0,
//       heart: 0,
//     },
//   }

// posts slice
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  selectors: {
    selectUserPostsById: createSelector(
      (state) => state.entities,
      (state, userId) => userId,
      (posts, userId) => {
        return Object.values(posts).filter((post) => post.userId === userId);
      }
    ),
  },

  reducers: {
    incCount: (state, action) => {
      state.count++;
    },
    addPost: (state, action) => {
      const { title, body, userId } = action.payload;
      const newPost = {
        id: nanoid(),
        title: title,
        body: body,
        date: new Date().toISOString(),
        userId: userId,
        reactions: {
          like: 0,
          heart: 0,
        },
      };
      postsAdapter.addOne(state, newPost);
    },
    removePost: (state, action) => {
      postsAdapter.removeOne(state, action.payload); // action.payload is the postId
    },
    addReaction: (state, action) => {
      const { postID, reaction } = action.payload;
      const existingPost = state.entities[postID];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      // map over the posts and add the properties
      const postsWithOtherProperties = action.payload.map((post, index) => {
        return {
          ...post,
          date: sub(new Date(), { minutes: index + 1 }).toISOString(),
          reactions: {
            like: 0,
            heart: 0,
          },
        };
      });
      // add the posts to the state
      postsAdapter.upsertMany(state, postsWithOtherProperties);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      const lastPostId = state.ids[state.ids.length - 1];
      action.payload.id = lastPostId + 1;
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        like: 0,
        heart: 0,
      };

      // add the new post to the state
      postsAdapter.addOne(state, action.payload);
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      action.payload.date = new Date().toISOString();
      postsAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      // action.payload is the postId
      postsAdapter.removeOne(state, action.payload);
    });
  },
});

// export actions
export const { incCount, addPost, removePost, addReaction } =
  postsSlice.actions;

// export selectors
export const { selectUserPostsById } = postsSlice.selectors;

// export adapter selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

// export reducer
export default postsSlice.reducer;
