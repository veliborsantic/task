import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [{}],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    replaceTasks(state, action) {
      state.tasks = action.payload;
    },
    // updateTask() {},
    // deleteTask() {},
  },
});

export const tasksActions = tasksSlice.actions;
