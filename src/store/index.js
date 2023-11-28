import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./slices/tasksSlice";
import { userSlice } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
