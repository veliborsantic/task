import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskToBackend,
  updateTaskOnBackend,
  deleteTaskOnBackend,
  updateStatusOnBackend,
} from "../../utils/apiutils";

const initialState = {
  tasks: [{}],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    initTasks(state, action) {
      const { tasksData, userId } = action.payload;
      state.tasks = tasksData.filter((task) => task.userId === userId);
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

export const addTask = (newTask) => async (dispatch) => {
  try {
    dispatch(tasksSlice.actions.addTask(newTask));
    await addTaskToBackend(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const updateTask = (task) => async (dispatch) => {
  try {
    dispatch(tasksSlice.actions.updateTask(task));
    await updateTaskOnBackend(task);
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch(tasksSlice.actions.deleteTask(id));
    await deleteTaskOnBackend(id);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const updateStatus = (data) => async (dispatch) => {
  try {
    dispatch(tasksSlice.actions.updateStatus(data));
    await updateStatusOnBackend(data);
  } catch (error) {
    console.error("Error updating task status", error);
  }
};

export const tasksActions = tasksSlice.actions;
