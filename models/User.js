const {Schema, model} = require('mongoose');
const thoughtsSchema = require('./Thought');

// Schema to create Users model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique:true,
            //Must match a valid email address(look into Mongoose's  matching validation)
            match: /.+\@.+\..+/
        },

        thoughts: [
            //Array of _id values referencing the Thoughts models(self reference)
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ] , 
        
        friends:[
            //array of _id values  referencing User model(self-reference)
            {
                type:Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
        
       
        }, 
        {
            toJSON: {
                virtuals: true
        }, 
        id: false
    }
)

// Create a virtual property `domain` that's computed from `email`.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('User', userSchema);
module.exports = User;
