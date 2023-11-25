import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./slices/tasksSlice";

const store = configureStore({ reducer: tasksSlice.reducer });

export default store;
