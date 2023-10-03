import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useSelector,useDispatch } from "react-redux";
import { UpdateDataFromServer } from "../slices/taskSlice";

const MyVerticallyCenteredModal = (props) => {
  // useSelctor
  const { selectedTask } = useSelector((state) => state.tasks);

  //addTitle
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(0);

  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setId(selectedTask._id);
    }
  }, [selectedTask]);

  const updateTask = () => {
    props.onHide();
    dispatch(UpdateDataFromServer({ _id:id, title, description }));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Task Title */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Form.Group>

          {/* Task Description */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Task Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="text-end">
          <Button
            variant="primary"
            className="me-2"
            type="submit"
            onClick={() => updateTask()}
          >
            Upadate Task
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
