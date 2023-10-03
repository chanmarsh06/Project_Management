import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import MyVerticallyCenteredModal from "./UpdateTAsk";

import { useSelector, useDispatch } from "react-redux";

import {
  setSelectedTask,
  removeTaskFromList,
  getTaskFromServer,
  DeleteDataFromServer,
} from "../slices/taskSlice";

function TaskList() {
  // use selector
  const { tasksList } = useSelector((state) => state.tasks);
  // dispatch
  const dispatch = useDispatch();
  // usestate
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(getTaskFromServer());
  }, [dispatch]);

  // update
  const updateTask = (task) => {
    setModalShow(true);
    dispatch(setSelectedTask(task));
  };
  const deleteTask = (task) => {
    dispatch(DeleteDataFromServer(task))
    // .unwarp()
    .then(()=>{
      dispatch(removeTaskFromList(task));
    }) 
  };

  return (
    <>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasksList.length ? (
            tasksList.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <Button
                    variant="primary me-2"
                    onClick={() => updateTask(task)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </Button>
                  <Button onClick={() => deleteTask(task)}>
                    <i variant="danger" className="bi bi-trash3-fill"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Task Assigned</td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* one of the component  */}
      <MyVerticallyCenteredModal
        show={modalShow} // initial state (false)
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default TaskList;
