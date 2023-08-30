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
      const thought = await Thought.findOne({_id: req.params.thoughtId})
      if(!thought) {
        return res.status(404)({message: 'No thought'})
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
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }, 
  //Delete a thought by Id//
  async deleteThought(req,res) {
    try {
      const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
      
    if(!thought) {
        return res.status(404).json({ message: 'No thought with that id'});
    }  
    res.status(200).json({ message: 'Thought has been deleted'});
    } catch (err) {
       res.status(500).json(err)
    }
  },
  //Update a thought by Id//
  async updateThought(req,res) {
    try{
      const thought = await Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
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
        { _id: req.params.thoughtId},
        { $addToSet: { thought: req.params.thoughtId}},
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
        {_id: req.params.thoughtId},
        {$pull: {thoughts: req.params.thoughtId}},
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