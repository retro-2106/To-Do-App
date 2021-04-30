const mongoose = require("mongoose");

//defining schema  for db
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },
});

const task = mongoose.model("task", taskSchema);

module.exports = task;