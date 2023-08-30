const {Thought, User} = require('../models');

module.exports = 
{async createThoughts(req, res) {
  try {
    const dbUserData = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $set: req.body },
      { new: true }
    );

    if (!dbUserData) {
      return res
        .status(404)
        .json({ message: "Thought created but no user with this id!" });
    }
      res.json({ message: "Thought successfully created!" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

    async getThought(req, res) {
        try {
          const thought = await Thought.find({_id: req.params.userId});
          if(!userId){
            return res.status(404).json({message: 'No user with that id!'})
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.courseId })
            .select('-__v');
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      }, 
      //update thought
      async updateThought(req,res) {
        try{
          const updatedThought = await User.findByIdAndUpdate(
            {_id:req.params.userId},
            {$set: req.body},
            { runValidators: true,
            new: true
          });
          if(!updatedThought) {
            return res.status(404).json({message: 'No thought with that id!'});
          }
          res.status(200).json(updatedThought);
        } catch(err) {
          res.status(500).json(err)
        }
      },
      async deleteThought(req,res) {
        try{
          const deletedThought = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {thoughts: req.params.thoughtsId}},
            {new: true}
          )
          if(!deletedThought) {
            return res.status(400).json({message:'No thought with that id!' });
          }
          res.status(200).json(deletedThought);
        } catch(err) {
          res.status(500).json(err);
        }
      
      },
      async createReaction(req,res) {
        try{
          const createdReaction = await User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: { friends: req.params.thoughtsId}},
            { new: true}
          )
          if(!createdReaction) {
            return res.status(400).json({message: 'No thoughts ID!'});
          }
          res.status(200).json(createdReaction) 
          } catch(err) {
            res.status(500).json(err);
          }
        },
        async deleteReaction(req,res) {
          try{
            const deletedReaction = await User.findOneAndUpdate(
              {_id: req.params.userId},
              { $pull: {reactions: req.params.userId}},
              {new: true}
            )
            if(!deletedReaction) {
              return res.status(400).json({message: 'No user ID!'});
            }
            res.status(200).json(deletedReaction);
          } catch(err) {
            res.status(500).json(err)
          }
      },
  }
