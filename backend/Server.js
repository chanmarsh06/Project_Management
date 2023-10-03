const express = require("express");
const app = express();
// cors
const cors = require('cors')
// import routes
const TaskRoute = require("./routes/TaskRoute");
// mongoose
const mongoose = require("mongoose");
// environment variable
require("dotenv").config();

// read json data
app.use(express.json());

// cors 
app.use(cors())

// mongoDb connection mongo DB (atlas) to express app(server)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // server
    app.listen(process.env.PORT, () =>
      console.log(
        `DataBase connected successfully listening to ${process.env.PORT} port`
      )
    );
  })
  .catch((err) => {
    console.log(err);
  });

  
//middleware method (POST)
app.use("/api/tasks", TaskRoute);

//middleware method (get)
app.use("/api/tasks", TaskRoute);

//middleware method (GET:id)
app.use("/:id", TaskRoute);

