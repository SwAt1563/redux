// usersSlice.js
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_BASEURL = "https://jsonplaceholder.typicode.com/users";

// fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_BASEURL);
    return response.data;
  } catch (error) {
    return error;
  }
});

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

// users slice
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = state.users.concat(action.payload);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
  selectors: {
    selectAllUsers: createSelector(
      (state) => state.users,
      (users) => users
    ),
  }
  
});

// export actions
export const { addUser, removeUser } = usersSlice.actions;

// export selectors
export const {selectAllUsers} = usersSlice.selectors;

// export reducer
export default usersSlice.reducer;
