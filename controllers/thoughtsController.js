const {Thought, User} = require('../models');

const thoughtController = {
  async getThought(req,res) {
    try{
      const thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get single thought
  async getSingleThought(req,res) {
    try {
      const thought = await Thought.findOne({_id: req.params.thoughtsId});
      
      if(!thought) {
        return res.status(404).json({message: 'No thought with this Id!'})
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 
  //create thought 
  async createThoughts(req,res) {
    try{
      const thought = await Thought.create(req.body);
     
      console.log("User ID: ", req.body.userId);

      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id} }, {
        runValidators: true,
        new: true
    });
    return res.status(200).json({thought,user});
    } catch (err) {
      res.status(500).json(err);
    }
  }, 
  //Delete a thought by Id//
  async deleteThought(req,res) {
    try {
      const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtsId});
      
      if(!thought) {
          return res.status(404).json({ message: 'No thought with that id'});
      }  

      const associatedUser = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtsId},
        { $pull: { thoughts: req.params.thoughtsId} },
        { new: true }
      );

      res.status(200).json({ message: 'Thought has been deleted'});
    } catch (err) {
       res.status(500).json(err)
    }
  },
  //Update a thought by Id//
  async updateThought(req,res) {
    console.log("Params: ", req.params);
    console.log("Data: ", req.body);

    try{
      const thought = await Thought.findOneAndUpdate(
        {_id:req.params.thoughtsId},
        {$set: req.body},
        {runValidators:true,
        new: true
      });
      if(!thought) {
        return res.status(404).json({ message: 'No thought with that id'});
      }
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  //Create reaction
  async createReaction(req,res) {
    try{
      const currentReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtsId},
        { $addToSet: { reactions: req.body }},
        {runValidators: true, new: true}
      )
      if (!currentReaction) {
          return res.status(404).json({ message: 'No thought with that id'});
        }
        res.status(200).json(currentReaction);
      } catch(err) {
        res.status(500).json(err)
      }
  },
  //delete reaction//
  async deleteReaction(req,res) {
    try{
      const currentReaction = await Thought.findByIdAndUpdate( 
        {_id: req.params.thoughtsId},
        {$pull: { reactions: { reactionId: req.params.reactionsId } }},
        {runValidators: true, new: true}
      )
    if(!currentReaction) {
      res.status(400).json({ message: 'No thought with that id'});
    }
    res.status(200).json(currentReaction);
    } catch(err) {
      res.status(500).json(err)
    }
  },
}


  module.exports = thoughtController