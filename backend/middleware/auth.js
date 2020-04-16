const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const keyPath = path.join(__dirname, '../private_key/key.txt');
        const private_key = fs.readFileSync(keyPath, 'utf8');
        const decoded = jwt.verify(token, private_key);

        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        if(!user) throw new Error();

        req.token = token;
        req.user = user;

        next();
        
    }catch(error) {
        res.status(401).send({error: 'Please authenticate.'});
    }
};

module.exports = auth;

