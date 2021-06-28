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
// Update the Express Router
// Now open routes/campsiteRouter.js and update its code as follows: 
const express = require('express');
const Campsite = require('../models/campsite');

// create new express router. 
// Give object name campsiteRouter used with express routing methods 
const campsiteRouter = express.Router();

// single statement routing 
// handles endpoints routing to campsites 
// 4. Express router Update EDit via https://learn.nucamp.co/mod/book/view.php?id=3590&chapterid=4069
// Update the Express Router
// Now open routes/campsiteRouter.js and update its code as follows: 

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



/* campsiteRouter.route('/') OLD Router
.all((req, res, next) => { // app.all() routing method is default for .all routing methods 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
     passes control of application routing to next relevent routing method
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
}); */ 

// Assignment addition 
// Add a new campsiteRouter.route() method, and as its argument, give it the path of '/:campsiteId'.
// 4. Edited Express router via https://learn.nucamp.co/mod/book/view.php?id=3590&chapterid=4069
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


/* campsiteRouter.route('/:campsiteId')  edited 
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
}) */ 
// task 2 and task 3 are the same as task 1 import and export of things are correct 
// simply copy paste and alter campsite for partner and promotion


//////// added comments Edit Via https://learn.nucamp.co/mod/book/view.php?id=3590&chapterid=4071
// SUBDOCUMENT ::::: comments

campsiteRouter.route('/:campsiteId/comments') // /comments endpath 
.get((req, res, next) => { // GET method updated o findById which looks for single instance (tells what argument to look for) Study API documentation 
    Campsite.findById(req.params.campsiteId) //  passed campsiteID as an argument that tells it what id to look for 
    .then(campsite => { // campsite / only want the comments for this one campsite // requst if campsite (if document is returned) res.json 
        if (campsite) {  // if campsite document can be returned 
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(campsite.comments); // then send back the comments accesses comments array formatted as json 
        } else { // Error Object 
            err = new Error(`Campsite ${req.params.campsiteId} not found`); // errors for if not found 404 
            err.status = 404; // staus property 
            return next(err);     // passes Error to Express error handling mechanism
        }
    })
    .catch(err => next(err));
})
// POST METHOD could be copied from the get method 
.post((req, res, next) => {  // post a new or next comment  to the list of comments for the particualr campsite
    Campsite.findById(req.params.campsiteId) // findById method to get campsite document we want to adda comment to 
    .then(campsite => {
        if (campsite) { // if makes sure a truthy value is returned for campsite document 
            campsite.comments.push(req.body); // array method to push new comment into the comments array // this only pushes the comment into the array of the application's memory and not the subdocument in the mongoDB database 
            campsite.save() // saves the comment to the mngoDB databas // returns a promise so we can change a .then method to it (c<-- little c campsite for this campsite )
            .then(campsite => {  // if it resolved we get the save document back and send it back to the client with the res.json method 
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err)); // chained .catch to handle errors 
        } else { // Error Object 
            err = new Error(`Campsite ${req.params.campsiteId} not found`); // errors for if not found 404 
            err.status = 404; // staus property 
            return next(err); // passes Error to Express error handling mechanism
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403; // change single quotes to backticks /id from rout perams ${} / campsites <-- echos back to client the path they tried to reach
    res.end(`PUT operation not supported on /campsites/${req.params.campsiteId}/comments`);
})
.delete((req, res, next) => {  // very similar to the post method above so it could be copy pasted and altered 
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {                                                  //   for the length of the array             decrement i
        if (campsite) {  // equals comments remove items without breaking the for loop ( array.length - 1; i >=0 ; i--) let i equal [array loop function] 
            for (let i = (campsite.comments.length-1); i >= 0; i--) {   // this is the iterater loop let i equal [array loop function]  https://www.codecademy.com/forum_questions/529bc86980ff33fe45011652
                campsite.comments.id(campsite.comments[i]._id).remove(); // instead of pushing -- campsite.comments.push(req.body); -- to comments array https://www.oreilly.com/library/view/javascript-the-definitive/9781449393854/ch07s06.html
            }                                                            // using a (for loop) let i =  (if array.length) i is greater than zero
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});
//////////////////////////////////// this handles specific comments of a specific campsite 
campsiteRouter.route('/:campsiteId/comments/:commentId')
.get((req, res, next) => { // still use campsite.findById 
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {  // Checks if campsite is truthy also if COMMENT is truthy (or exist) using commentID
        if (campsite && campsite.comments.id(req.params.commentId)) {      // "if campsite is truthy AND campsite.comments.id(require.perameters.comentId) as argument is truthy" 
            res.statusCode = 200; // res.statusCode = Everything's RAD! 200 
            res.setHeader('Content-Type', 'application/json');  // then res the header of ('the given content', 'found in  
            res.json(campsite.comments.id(req.params.commentId));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}/comments/${req.params.commentId}`);
})
.put((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            if (req.body.rating) {
                campsite.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if (req.body.text) {
                campsite.comments.id(req.params.commentId).text = req.body.text;
            }
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Campsite.findById(req.params.campsiteId)
    .then(campsite => {
        if (campsite && campsite.comments.id(req.params.commentId)) {
            campsite.comments.id(req.params.commentId).remove();
            campsite.save()
            .then(campsite => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(campsite);
            })
            .catch(err => next(err));
        } else if (!campsite) {
            err = new Error(`Campsite ${req.params.campsiteId} not found`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Comment ${req.params.commentId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});
//////////////////////////    EXPORT campsiteRouter /////////////////
module.exports = campsiteRouter; // exports router npm start