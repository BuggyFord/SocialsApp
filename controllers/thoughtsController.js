const {Thought, User} = require('../models');

module.exports = 
{async createThoughts(req, res) {
  try {
    const dbThoughtData = await Thought.create(req.body);

    const dbUserData = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: dbThoughtData._id } },
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
          const thought = await Thought.find();
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
      }
}