const express = require('express');

//defining app and port
const app = express();
const port = 8000;

//getting database
const db = require("./config/mongoose");
const task = require("./models/tasks");

//setting views and engine
app.set("view engine", "ejs");
app.set("views", "./views");

//setting up routes
app.use("/", require("./routes"));

//settinf static files
app.use(express.urlencoded());
app.use(express.static("assets"))

//creating and storing task in db
app.post("/create-task", (req, res) => {
  // pushing in database
  task.create(
    {
      task: req.body.description,
      category: req.body.category,
      date: req.body.date,
    },
    function (err, tasks) {
      if (err) {
        console.log("Error in creating a task!");
        return;
      }

      // rerender the home page
      console.log("******", tasks);
      return res.redirect("back");
    }
  );
});

//deleting the task from database
app.post("/delete-task", (req, res) => {
  console.log(req.body);

  let tasks = Object.keys(req.body);

  for (tsk of tasks) {
    // mongoose to delete the tasks
    task.deleteOne({ _id: tsk }, function (err) {
      if (err) {
        console.log("Error in deleting from database.", err);
        return;
      }
    });
  }
  return res.redirect("back");
});

//setting listen
app.listen(port, function (err) {
    if (err) return console.log(`Error: ${err}`);
  
    console.log(`Server is running on port: ${port}`);
  });