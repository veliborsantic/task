import styles from "./header.module.scss";
import NewTask from "../new-task";
import { useState } from "react";

const Header = (props) => {
  const [showNewTask, setShowNewTask] = useState(false);

  const newTaskHandler = () => {
    setShowNewTask(true);
  };

  const onClose = () => {
    setShowNewTask(false);
  };

  return (
    <div className={`bg-primary ${styles.header}`}>
      <div className='p-3 d-flex justify-content-end align-items-center'>
        <button className='mx-auto' onClick={newTaskHandler}>
          Add tasks
        </button>
        <button>Login</button>
      </div>
      {showNewTask && (
        <NewTask
          isOpen
          onClose={onClose}
          editMode={false}
          onAddNewTask={props.onAddNewTask}
        />
      )}
    </div>
  );
};

export default Header;
