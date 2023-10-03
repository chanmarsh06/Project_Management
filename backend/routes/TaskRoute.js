const express = require("express");
const router = express.Router();

//import controller file
const { createTask, ReadTask, RaedSingleTask, UpdateTask ,DeleteTask } = require("../controllers/TaskController");

// Post Request
router.post("/", createTask);

// GET request
router.get('/',ReadTask)

// GET reques (sigle request)
router.get('/:id',RaedSingleTask);

// PATCH reuest (update task);
router.patch('/:id',UpdateTask)

// PATCH reuest (update task);
router.delete('/:id',DeleteTask)

//export route
module.exports= router
