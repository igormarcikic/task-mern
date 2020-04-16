const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/users');
const taskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3001;


// Parse requests automatically
app.use(express.json());


// User Routes
app.use(userRouter);
// Task Routes
app.use(taskRouter);


app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});
