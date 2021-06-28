// Mogoos schema 
/*
Create a sub-folder named models in the node-mongoose folder. 
Create a file in the models folder named campsite.js and add the following code to create a Mongoose schema: 
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ////////////////// edit 4. Added Currency https://learn.nucamp.co/mod/book/view.php?id=3590&chapterid=4069
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;



/////////// added Edit 3. https://learn.nucamp.co/mod/book/view.php?id=3579&chapterid=4057
// Mongoos ODM parts 
   const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},
  { timestamps: true }
);
// Changed campsite Schema per https://learn.nucamp.co/mod/book/view.php?id=3590&chapterid=4069
//////// Update the Mongoose Schema/Model
// Update the Mongoose Schema/Model
// Next open campsite.js in the nucampsiteServer/models folder and update it as follows: 


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
const Campsite = mongoose.model('Campsite', campsiteSchema);
module.exports = Campsite;
/* 2. 
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
    comments: [commentSchema]
}, {
    timestamps: true
});
*/
//////////////////// End 3. ///////////////////////////////////////////////
// 3. Add subdocuments to a document 
/*
const Campsite = mongoose.model('Campsite', campsiteSchema);
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
}); */


//const Campsite = mongoose.model('Campsite', campsiteSchema);
// module.exports = Campsite;


/* 1. implementing Node application  /// https://learn.nucamp.co/mod/book/view.php?id=3579&chapterid=4056
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;


*/