import React, { useState } from "react";
import styles from "./new-task.module.scss";
import { STATUS } from "@/constants/dummy-tasks";
import uuid from "react-uuid";
import { tasksActions } from "../../store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

const NewTask = (props) => {
  const { isOpen, onClose, editMode, description, title, id, status } = props;
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const newId = uuid();
  const tasks = useSelector((state) => state.tasks);

  const [newTask, setNewTask] = useState({
    id: id || newId,
    title: title || "",
    description: description || "",
    status: status || STATUS.TODO,
  });

  const handleTitleChange = (e) => {
    setNewTask({ ...newTask, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewTask({ ...newTask, description: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? newTask : task
      );
      dispatch(tasksActions.replaceTasks(updatedTasks));
    } else {
      dispatch(tasksActions.addTask(newTask));
    }
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div>
          <div className='d-flex justify-content-end'>
            <button onClick={onClose}>X</button>
          </div>
          <h2 className='text-center'>{editMode ? "Edit" : "New"} Task</h2>
          <form onSubmit={handleOnSubmit}>
            <input
              className='d-block w-100 my-4'
              type='text'
              id='title'
              name='title'
              value={newTask.title}
              placeholder='Enter task title...'
              onChange={handleTitleChange}
            />
            <textarea
              className='d-block w-100'
              id='description'
              name='description'
              value={newTask.description}
              placeholder='Enter task description...'
              onChange={handleDescriptionChange}
            />
            <button className='d-block mx-auto mt-5' type='submit'>
              {editMode ? "Update" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
