export const addTaskToBackend = async (newTask) => {
  await fetch("/api/tasks/create", {
    method: "POST",
    headers: { "Content-TYPE": "application/json" },
    body: JSON.stringify(newTask),
  });
};

export const removeTaskFromBackend = async (id) => {
  await fetch("/api/tasks/delete", {
    method: "POST",
    headers: { "Content-TYPE": "application/json" },
    body: JSON.stringify(id),
  });
};

export const updateTaskOnBackend = async (updatedTask) => {
  await fetch("/api/tasks/update", {
    method: "POST",
    headers: { "Content-TYPE": "application/json" },
    body: JSON.stringify(updatedTask),
  });
};

export const updateStatusOnBackend = (data) => {
  fetch("/api/tasks/status", {
    method: "POST",
    headers: { "Content-TYPE": "application/json" },
    body: JSON.stringify(data),
  });
};
