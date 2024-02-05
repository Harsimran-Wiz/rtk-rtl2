import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.meta?.requestStatus === "fulfilled",
        (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addMatcher(
        (action) => action.meta?.requestStatus === "rejected",
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;