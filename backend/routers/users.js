const express = require('express');
const multer = require('multer');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();



// Create user
router.post('/users', async (req,res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch(error) {
        res.status(400).send(error.message);
    }
});

// Log in user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({user, token});
    } catch(error) {
        res.status(500).send(error);
    }
});

// Log out from the current session
router.post('/users/logout', auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    }catch(error){
        res.status(500).send();
    }
});

// Update user
router.patch('/users/me', auth, async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValid = updates.every(update=> allowedUpdates.includes(update));

    if(!isValid) res.status(400).send({error: 'Invalid updates'});

    try {
        updates.forEach(update=> req.user[update] = req.body[update]);
        await req.user.save();
        res.send({user: req.user, token: req.token});
    }catch(error) {
        res.status(400).send();
    }
});

// Delete user
router.delete('/users/me', auth, async (req,res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    }catch(error) {
        res.status(500).send();
    }
});


// Multer options object
const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }

        cb(null, true);
    }
});
// File upload
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();

    res.send({user: req.user, token: req.token});
}, (error, req, res, next) => {
    res.send({error: 'Please upload an image'});
});


// Delete avatar
router.delete('/users/me/avatar', auth, async (req, res)=>{
    req.user.avatar = undefined;
    await req.user.save();

    res.send();
});

// Get img url
router.get('/users/:id/avatar', async(req, res) =>{
    try {
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar) {
            return new Error();    
        }

        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar);
    }catch(error) {
        res.status(404).send();
    }
});


module.exports = router;






