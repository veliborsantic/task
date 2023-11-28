import React, { useEffect } from "react";
import Header from "../components/header";
import TasksList from "../components/tasks-list";
import { STATUS, API } from "../constants";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions, updateStatus } from "@/store/slices/tasksSlice";
import { getSession } from "next-auth/react";
import { userActions } from "@/store/slices/userSlice";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);

const Home = (props) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  const { session } = props;
  dispatch(userActions.setUserId(session.user.email));

  useEffect(() => {
    const getTasks = async () => {
      const response = await fetch("http://localhost:3000/api/tasks");
      const tasksData = await response.json();
      dispatch(tasksActions.initTasks({ tasksData, userId }));
    };
    getTasks();
  }, [userId]);

  const onDragEnd = (source) => {
    if (!source.destination?.droppableId) return;

    const id = source.draggableId;
    const newStatus = source.destination.droppableId;
    const data = { id, newStatus };
    dispatch(updateStatus(data));
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
        destination: API.LOGIN,
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
