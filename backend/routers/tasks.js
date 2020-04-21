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

// Read all tasks/ or with a query /tasks?completed=false
// limit and skip pagination options - GET /tasks?limit=2?skip=0
// sort by - GET /tasks?sortBy=createdAt_asc   (_desc)
router.get('/tasks', auth, async (req,res)=>{
    // const tasks = await Task.find({ owner: req.user._id });
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

    const Tt = await Task.paginate(query, options);


    // const match = {};
    // const sort = {};

    // if(req.query.completed) {
    //     match.completed = req.query.completed === null;
    // }

    // if(req.query.sortBy) {
    //     const parts = req.query.sortBy.split('_');
    //     sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    // }

    try{
        // await req.user.populate({
        //     path: 'tasks',
        //     match: match,
        //     options: {
        //         limit: parseInt(req.query.limit),
        //         skip: parseInt(req.query.skip),
        //         sort: sort
        //     }
        // }).execPopulate();
        // res.send(req.user.tasks);
        res.send(Tt);
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