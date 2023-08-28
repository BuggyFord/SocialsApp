const { Schema } = require("mongoose");


const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        
        createdAt:{
            type:Date,
            default:Date.now,

        },

        username:{
            type:String,
            required:true
        },
        //array of _id values  referencing User model(self-reference)
        reactions:[reactionSchema]
    }
);

const reactionSchema = new Schema(
    { 
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type:String,
            required:true,
            maxlength:280,
        },
        username:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            default:Date.now,
        }

    }
)
//Schema Settings

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
  thoughtSchema.virtual(reactionCount).get(function() {
    return this.reactions.length;
  });

  const Thoughts = model('Thoughts', thoughtSchema);

  module.exports = Thoughts;