const { User, Thoughts } = require('../models');


// all of the DATABASE interaction/logic code to INTERACT WITH USERS in the database (goes here)
    //get all users//
module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
//get single user//
    async getSingleUser(req, res ) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            if(!user) {
                return res.status(404).json({ message: 'No user with that ID!'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create user
    async createUser(req,res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Delete a user by Id//
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID!'});
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }, 

    //Update a user by Id//
    async updateUser(req,res) {
        try{
            const user = await User.findOneAndUpdate({_id:req.params.userId});
            
            if(!user) {
                return res.status(404).json({message: 'No user with that ID!'});
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}


module.exports = userController