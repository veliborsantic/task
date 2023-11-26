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
  <div className={styles.header}>
    <div className='p-3 d-flex justify-content-between align-items-center'>
      <div>
        <button className='button' onClick={newTaskHandler}>
          Add new task
        </button>
      </div>
      <div className='d-flex align-items-center'>
        <div className='text-white'>{props?.session.user.name || ""}</div>
        <button className='button' onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
    {showNewTask && <NewTask isOpen onClose={onClose} />}
  </div>
);

};

export default Header;
