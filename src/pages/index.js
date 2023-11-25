import React, { useState } from "react";
import Header from "../components/header";
import TasksList from "../components/tasks-list";
import { STATUS, DUMMY_TASKS } from "../constants/dummy-tasks";
import dynamic from "next/dynamic";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const onDragEnd = (source) => {
    if (!source.destination?.droppableId) return;

    const updatedTasks = tasks.map((task) =>
      task.title === source.draggableId
        ? { ...task, status: source.destination.droppableId }
        : task
    );
    setTasks(updatedTasks);
  };

  const onAddNewTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className='container'>
      <Header onAddNewTask={onAddNewTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='d-flex tasklist'>
          {Object.values(STATUS).map((status) => (
            <TasksList
              key={status}
              title={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export async function getServerSideProps() {
  console.log("ssr");

  return {
    props: {
      nekiProp: "xx",
    },
  };
}

export default Home;
