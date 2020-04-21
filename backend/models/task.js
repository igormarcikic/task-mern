const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
    },
    description: {
        type: String,
        required: true,
        minlength: 15,
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

// Use a plugin for pagination
taskSchema.plugin(mongoosePaginate);

// Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;