import styles from "./header.module.scss";
import NewTask from "../new-task";
import { useState } from "react";
import { signOut } from "next-auth/react";

const Header = (props) => {
  const [showNewTask, setShowNewTask] = useState(false);

  const newTaskHandler = () => {
    setShowNewTask(true);
  };

  const onClose = () => {
    setShowNewTask(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className={`bg-primary ${styles.header}`}>
      <div className='p-3 d-flex justify-content-end align-items-center'>
        <button className='mx-auto button' onClick={newTaskHandler}>
          Add new task
        </button>
        <div className='text-white'>{props?.session.user.name || ""} </div>
        <button className='button' onClick={handleSignOut}>
          Sign out
        </button>
      </div>
      {showNewTask && <NewTask isOpen onClose={onClose} />}
    </div>
  );
};

export default Header;
