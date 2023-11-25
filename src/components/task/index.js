import React from "react";
import styles from "./task.module.scss";
// import dynamic from "next/dynamic";
import { Draggable } from "react-beautiful-dnd";

// const Draggable = dynamic(
//   () =>
//     import("react-beautiful-dnd").then((mod) => {
//       return mod.Draggable;
//     }),
//   { ssr: false }
// );

const Task = (props) => {
  const { title, description, index } = props;

  return (
    <Draggable draggableId={title} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`d-flex mx-5 my-1 justify-content-center ${styles.task}`}
        >
          <div>
            <div className='d-flex justify-content-center'>{title}</div>
            <div className='mt-5 mx-3'>{description}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;