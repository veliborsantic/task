import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [{}],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    updateTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateStatus(state, action) {
      const { id, newStatus } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      );
    },
  },
});

export const tasksActions = tasksSlice.actions;
