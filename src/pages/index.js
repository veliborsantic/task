import React, { useEffect } from "react";
import Header from "../components/header";
import TasksList from "../components/tasks-list";
import { STATUS } from "../constants";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "@/store/slices/tasksSlice";
import { getSession } from "next-auth/react";
import { store } from "../store";

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

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:3000/api/tasks");
      const tasksData = await response.json();
      console.log("td", tasksData);
      dispatch(tasksActions.initTasks(tasksData));
    };
    getTasks();
  }, []);

  const onDragEnd = (source) => {
    if (!source.destination?.droppableId) return;

    const id = source.draggableId;
    const newStatus = source.destination.droppableId;

    dispatch(tasksActions.updateStatus({ id, newStatus }));
    updateStatusOnBackend({ id, newStatus });
  };

  const updateStatusOnBackend = (data) => {
    fetch("/api/tasks/status", {
      method: "POST",
      headers: { "Content-TYPE": "application/json" },
      body: JSON.stringify(data),
    });
  };

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
