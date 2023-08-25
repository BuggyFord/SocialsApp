const {Schema, model} = require('mongoose');
const thoughtsSchema = require('./thoughts');

// Schema to create Users model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,

        },

        email: {
            type: String,
            required: true,
            //Unique: ,
            //Must match a valid email address(look into Mongoose's  matching validation)
        },

        thoughts: {
            //Array of _id values referencing the Users modes(self reference)
        }, 
        
        friends: {
            //array of _id values  referencing User model(self-reference)
        }
    }
)


module.exports = thoughtsSchema;
