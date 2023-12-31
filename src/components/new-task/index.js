import React, { useState } from "react";
import styles from "./new-task.module.scss";
import { STATUS } from "@/constants";
import uuid from "react-uuid";
import { deleteTask, addTask, updateTask } from "../../store/slices/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

const NewTask = (props) => {
  const { isOpen, onClose, editMode, description, title, id, status } = props;
  if (!isOpen) return null;

  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const newId = uuid();

  const [newTask, setNewTask] = useState({
    id: id || newId,
    userId: userId || "",
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

  const handleTasksChange = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateTask(newTask));
    } else {
      dispatch(addTask(newTask));
    }
    onClose();
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div>
          <div className='d-flex justify-content-end'>
            <button className='close-button' onClick={onClose}>
              X
            </button>
          </div>
          <h2 className='text-center text-white'>
            {editMode ? "Edit" : "New"} Task
          </h2>
          <form onSubmit={handleTasksChange}>
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
            <div className='d-flex'>
              <button
                className='d-block mx-auto mt-5 button disabled'
                type='submit'
                disabled={!newTask.title || !newTask.description}
              >
                {editMode ? "Update" : "Save"}
              </button>
              {editMode && (
                <button
                  className='mx-auto mt-5 button delete-button'
                  type='submit'
                  onClick={handleDeleteTask}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
