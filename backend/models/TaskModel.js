const mongoose = require("mongoose");

// creating schema
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// crate model and exports
module.exports = mongoose.model('task',TaskSchema);

// const user = mongoose.model('task',TaskSchema);
// module.exports= user;
