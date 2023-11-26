import React from "react";
import Task from "../task";
import { Droppable } from "react-beautiful-dnd";
import styles from "./tasks-list.module.scss";

const TasksList = (props) => {
  const { title, tasks } = props;

  return (
    <div className={`col-4 ${styles.listContainer}`}>
      <h3
        className={`d-flex fw-bold mx-5 my-4 justify-content-center ${styles.title} `}
      >
        {title}
      </h3>
      <Droppable droppableId={title}>
        {(provided) => (
          <ul
            style={{ minHeight: "100px", marginLeft: "-2rem" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => {
              return (
                <li className='mx-0' key={task.id}>
                  <Task index={index} {...task} />
                </li>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default TasksList;
