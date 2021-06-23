/* Task 2: Add an Express router to handle routing for promotions
Create a new router in a separate module to handle the endpoints for promotions:

Create promotionRouter: 

DONE: In the node-express/routes folder, create a Node module named promotionRouter.js 
that will implement the Express router for the following paths:

DONE: copied code from promotionRouter // changed all instances of word promotion with promotion 
/promotions
/promotions/:promotionId 

Endpoints: Write a route() method on the router for each of the paths above, just as you did with the promotionRouter, 
chaining the .all(). .get(), .post(), .put(), and .delete() routing methods. Handle the responses in the same way as you did for the promotionRouter.

Update server.js: Integrate the Node module you created above within your Express application code in server.js, 
in the same way as you did with the promotionRouter.

Test: Use Postman to test each of your newly created endpoints and verify that you receive the expected responses. 
Test GET/POST/PUT/DELETE requests to: localhost:3000/promotions and localhost:3000/promotions/1

// need to go back to the exercizes 
For the POST request to localhost:3000/promotions, make sure to send a JSON string in the 
body of the request with a name and description, the same way you did in the exercises. 
For the PUT request to localhost:3000/promotions/1, make sure to send a JSON string in the body of the request as you did for the POST request described above.
*/


const express = require('express');
const promotionRouter = express.Router();

promotionRouter.route('/')
.all((req, res, next) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
  
    next();
})
.get((req, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403; 
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});

// Assignment 2 addition 

promotionRouter.route('/:promotionId')  

.all((req, res, next) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end(`Will send details of the promotion: ${req.params.promotionId} to you`);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})

.put((req, res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name}
      with description: ${req.body.description}`);
})

.delete((req, res) => {
    res.end(`Deleting promotion: ${req.params.promotionId}`);
})
// task 2 and task 3 are the same as task 1 import and export of things are correct 
module.exports = promotionRouter; // exports router 