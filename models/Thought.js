const { Schema, Types, model } = require("mongoose");


const reactionSchema = new Schema(
    { 
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type:String,
            required:true,
            max_length:280,
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
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            max_length: 280
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
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      }
);

//Schema Settings

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
  thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;