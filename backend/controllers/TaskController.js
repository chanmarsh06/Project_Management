//import model file
const mongoose = require("mongoose");
const TaskModel = require("../models/TaskModel");

// create TASK - POST
const createTask = async (req, res) => {
  // destructring data from front-end
  const { title, description } = req.body;
  try {
    const task = await TaskModel.create({ title, description });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get all tasks - GET
const ReadTask = async (req, res) => {
  try {
    // find all data from mongoDB atlas
    const tasks = await TaskModel.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get single task - GET
const RaedSingleTask = async (req, res) => {
  // get id from params
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "task not founded" });
  }
  try {
    const singeTask = await TaskModel.findById(id);
    res.status(200).json(singeTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update Task - PATCH
const UpdateTask = async (req, res) => {
  // get id
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'invalid Id'})
  }

  try {
    const updatetask = await TaskModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        ...req.body,
      }
    );
    res.status(200).json(updatetask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete Task - DELETE
const DeleteTask= async (req,res)=>{
  //get id
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'invalid id'})
  }

  try{
    const deletTask =await TaskModel.findByIdAndDelete(id);
    res.status(200).json(deletTask);
  }catch (err) {
    res.status(400).json({error: err.message})
  }
}

module.exports = { createTask, ReadTask, RaedSingleTask,UpdateTask, DeleteTask };
