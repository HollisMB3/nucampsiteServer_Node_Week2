/* Task 1: Complete the updates to campsiteRouter
Update campsiteRouter.js (in node-express/routes) to include support for the /:campsiteId route parameter:


Add endpoints to campsiteRouter.js: Update campsiteRouter.js to include handling GET/POST/PUT/DELETE requests for /campsites/:campsiteId:

Add a new campsiteRouter.route() method, and as its argument, give it the path of '/:campsiteId'.

Chain an .all() method to the route() method you added above. Make it identical to the .all() method used for the existing campsiteRouter.route('/') method.

Chain .get(), .post(), .put(), and .delete() methods to this route as well. Refer back to the Express Router exercise, Part 1, to recall how these endpoints were handled, and handle them in the same way, updating the code to work with the router as you learned to do in Part 2 of that same exercise. 

Test: Use Postman to test each of your newly created endpoints and verify that you receive the expected responses. 
Test GET/POST/PUT/DELETE requests to: localhost:3000/campsites/1 
You do not have to use /1. You could just as well use /23, or /foo, or any other string in its place.
For the PUT request, make sure to send a JSON string in the body of the request with a name and description, the same way you did in the exercises. 

*/ 

// code handles REST API endpoints for /campsites and campsites/campsiteId. 
const express = require('express');
// create new express router. 
// Give object name campsiteRouter used with express routing methods 
const campsiteRouter = express.Router();

// single statement routing 
// handles endpoints routing to campsites 
campsiteRouter.route('/')
.all((req, res, next) => { // app.all() routing method is default for .all routing methods 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // passes control of application routing to next relevent routing method
    next();
})
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403; // forbidden 403
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

// Assignment addition 
// Add a new campsiteRouter.route() method, and as its argument, give it the path of '/:campsiteId'.
campsiteRouter.route('/:campsiteId')  
// Chain an .all() method to the route() method you added above. Make it identical to the .all() method used for the existing campsiteRouter.route('/') method.
.all((req, res, next) => { // app.all() routing method will be defaul for all routing methods 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // passes control of the application routing to the next relevent routing method after this
    next();
})

.get((req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})

.put((req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
      with description: ${req.body.description}`);
})

.delete((req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
})
// task 2 and task 3 are the same as task 1 import and export of things are correct 
// simply copy paste and alter campsite for partner and promotion
module.exports = campsiteRouter; // exports router 