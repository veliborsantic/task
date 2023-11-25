import React from "react";
import Task from "../task";
// import dynamic from "next/dynamic";
import { resetServerContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const TasksList = (props) => {
  const { title, tasks } = props;

  resetServerContext();

  return (
    <div className='col-4'>
      <h4 className='d-flex mx-5 my-1 justify-content-center'>{title}</h4>
      <Droppable droppableId={title}>
        {(provided) => (
          <ul
            style={{ minHeight: "100px" }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => {
              return (
                <li key={task.title}>
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
