// 1) Import the express module
const express = require('express');
const app = express();

// 2) defining port no.
const port = 8000;

// use express router
app.use('/', require('./routes'));

// 3) Running the server on defined port
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`Server is running  on port : ${port}`);
})
