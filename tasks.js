const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true
    },
    due_date:{
        type: Date,
        min: '1987-09-28',
        max: '2025-05-23',
        required: true
    }
});

const Task = mongoose.model('Task', TodoSchema);
module.exports = Task;
