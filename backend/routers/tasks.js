const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const Task = require('../models/task');

// Create task
router.post('/tasks', auth, async(req,res)=>{
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch(error) {
        console.log(error)
        res.status(400).send(error.message);
    }
});


// Update task
router.patch('/tasks/:id', auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'completed', 'description'];
    const isValid = updates.every(update=> allowedUpdates.includes(update));
    if(!isValid) res.status(400).send({error: 'Invalid updates'});
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if(!task) throw new Error('No such task');

        updates.forEach(update=> task[update] = req.body[update]);
        await task.save();
        res.send(task);
    } catch(error) {
        res.status(400).send(error);
    }
});

// Read and query tasks
router.get('/tasks', auth, async (req,res)=>{
    const completed = req.query.completed;
    const page = req.query.page;
    const limit = req.query.limit;

    const sort = {};
    const query = {}

    if(completed) {
        query.completed = 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const options = {
        page: page,
        limit: limit,
        sort
    }

    
    try{
        const tasks = await Task.paginate(query, options);
        res.send(tasks);
    }catch(error){
        res.status(500).send();  
    }  
});

// Delete task 
router.delete('/tasks/:id', auth, async(req, res)=>{
    try{
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
        if(!task) res.status(404).send();
        res.send(task);
    }catch(error){
        res.status(500).send();
    }
});

module.exports = router;