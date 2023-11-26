import React from "react";
import Header from "../components/header";
import TasksList from "../components/tasks-list";
import { STATUS } from "../constants/dummy-tasks";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "@/store/slices/tasksSlice";
import { getSession } from "next-auth/react";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);

const Home = (props) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const { session } = props;

  const onDragEnd = (source) => {
    if (!source.destination?.droppableId) return;

    const updatedTasks = tasks.map((task) =>
      task.id === source.draggableId
        ? { ...task, status: source.destination.droppableId }
        : task
    );
    dispatch(tasksActions.replaceTasks(updatedTasks));
  };
  console.log(session);
  return (
    <div className='container'>
      <Header session={session} />
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

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: process.env.LOGIN_API,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default Home;
