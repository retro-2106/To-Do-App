const task = require("../models/tasks");

module.exports.home = function (req, res) {
    task.find({}, function (err, tasks) {
      if (err) {
        console.log("Error fetching tasks", err);
        return;
      }
      
      return res.render("home", {
        title: "TODO APP",
        task_list: tasks,
      });
    });
  };