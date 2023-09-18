const express = require('express');
const  app = express();
const port =  process.env.PORT || 3000;

const mongoose = require('./config/mongoose');

// Middleware to parse JSON request bodies
app.use(express.json());
// for form data
app.use(express.urlencoded({ extended: true }))

const passport = require('./config/passport');
app.use(passport.initialize());

app.use("/", require("./routes/index.js"))

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`Server is running on port ${port}`); 
    }
})
