import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {  addTaskToServer } from "../slices/taskSlice";
import { useDispatch } from "react-redux";

function AddTask() {
  // dispatch
  const dispatch = useDispatch()

  //addTitle
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // add task (update to store)
  const addTask = (e) => {
    e.preventDefault();
    // enter nothing
    if (!title || !description) return; 
    dispatch(addTaskToServer({ title, description }));

    // console.log(title,description);
    setTitle('');
    setDescription('')
  };

  return (
    <section className="my-5">
      <Form>
        {/* Task Title */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        {/* Task Description */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit" onClick={(e) => addTask(e)}>
            Add Task
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default AddTask;
