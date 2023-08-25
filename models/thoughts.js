

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
        
        reactions:{
            //array of nested documents created with the reactionSchema
        }


    }
    
) 
    

    