import React, { useState } from "react";
import styles from "./task.module.scss";
import { Draggable } from "react-beautiful-dnd";
import NewTask from "../new-task";

const Task = (props) => {
  const { title, description, index, id } = props;
  const [showNewTask, setShowNewTask] = useState(false);

  const onClickTaskHandler = () => {
    setShowNewTask(true);
  };

  // TODO: ovo ne radi dok redux ne dodje
  const onUpdateTask = () => {
    console.log("Izmjena");
  };

  // TODO: modal preseliti u redux
  const onClose = () => {
    setShowNewTask(false);
  };

  if (showNewTask)
    return (
      <NewTask
        isOpen
        editMode
        onUpdateTask={onUpdateTask}
        onClose={onClose}
        title={title}
        description={description}
        id={id}
      />
    );

  return (
    <>
      <Draggable draggableId={title} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`d-flex mx-5 my-1 justify-content-center ${styles.task}`}
            onClick={onClickTaskHandler}
          >
            <div>
              <div className='d-flex justify-content-center text-center mx-2 fw-bold'>
                {title}
              </div>
              <div className='d-flex justify-content-center mt-5 mx-1 text-center'>
                {description}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
