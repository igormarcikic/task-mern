const User = require('../models/user');
const bcrypt = require('bcryptjs');

const auth = async (req,res,next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) throw new Error('Unable to login');
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if(!isMatched) throw new Error('Unable to login');
        req.user = user;

        next();
    }catch(error) {
        console.log(error)
        res.status(401).send({error: 'Please authenticate.'});
    }
};

module.exports = auth;

