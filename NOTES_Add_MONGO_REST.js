/* Objectives

Develop a full-fledged REST API server with Express, MongoDB, and Mongoose.
Serve various REST API endpoints that interact with the MongoDB server. 


Exercise Resources 
db.json


Instructions

Copy the models folder from the node-mongoose folder to the nucampsiteServer folder you created before.
Then install mongoose and mongoose-currency in the nucampsiteServer folder: 
npm install mongoose@5.10.9 mongoose-currency@0.2.0


Update the Express application 
Open the app.js file and add in the code to connect to the MongoDB server as follows:
. . .

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err)
);
. . .


Update the Mongoose Schema/Model
Next open campsite.js in the nucampsiteServer/models folder and update it as follows: 
. . .

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

. . .

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
}, {
    timestamps: true
});
. . .


Update the Express Router
Now open routes/campsiteRouter.js and update its code as follows: 
const express = require('express');
const Campsite = require('../models/campsite');

const campsiteRouter = express.Router();

campsiteRouter.route('/')
.get((req, res, next) => {
    Campsite.find()
    .then(campsites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsites);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Campsite.create(req.body)
    .then(campsite => {
        console.log('Campsite Created ', campsite);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res, next) => {
    Campsite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

campsiteRouter.route('/:campsiteId')
.get((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.put((req, res, next) => {
    Campsite.findByIdAndUpdate(req.params.campsiteId, {
        $set: req.body
    }, { new: true })
    .then(campsite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(campsite);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Campsite.findByIdAndDelete(req.params.campsiteId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = campsiteRouter;


Start the application. Make sure your MongoDB server is up and running. 
You can now fire up Postman and test several operations on the REST API. You can use the data for all the campsites provided in the db.json file given above in the Exercise Resources to test your server, The db.json file is meant to provide you with JSON-formatted data that you can copy and paste to send to the server from Postman. It is not used in the execution of your app. See the video for details on how to use it for testing. 
Optional: Commit your changes to Git with the message "Express REST API with MongoDB and Mongoose Part 1" 


Summary

In this exercise, you developed a full-fledged REST API server with Express, MongoDB, and Mongoose. You updated the Express application to use Mongoose to connect to the MongoDB server, and you integrated the Mongoose module that exports the Campsite Model into your application. You used the Campsite Model to interact with the MongoDB server in response to HTTP requests intercepted by the campsiteRouter, and deal appropriately with each one. 
*/