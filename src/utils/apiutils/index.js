import { API } from "../../constants";

const method = "POST";
const headers = { "Content-TYPE": "application/json" };

export const addTaskToBackend = async (newTask) => {
  await fetch(API.CREATE, {
    method,
    headers,
    body: JSON.stringify(newTask),
  });
};

export const updateTaskOnBackend = async (updatedTask) => {
  await fetch(API.UPDATE, {
    method,
    headers,
    body: JSON.stringify(updatedTask),
  });
};

export const deleteTaskOnBackend = async (id) => {
  await fetch(API.DELETE, {
    method,
    headers,
    body: JSON.stringify(id),
  });
};

export const updateStatusOnBackend = (data) => {
  fetch(API.STATUS, {
    method,
    headers,
    body: JSON.stringify(data),
  });
};
