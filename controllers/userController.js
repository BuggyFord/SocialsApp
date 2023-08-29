const { User, Thought } = require('../models');


// all of the DATABASE interaction/logic code to INTERACT WITH USERS in the database (goes here)
    //get all users//
//  --> module.exports = {
const userController = {
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
        console.log("Incoming Data: ", req.body)
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //Delete a user by Id//
    async deleteUser(req, res) {
       // console.log("Incoming ID: ", req.params);
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId});
            console.log("User ", user);

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID!'});
            }
            res.status(200).json({ message: 'User has been deleted'})
        } catch (err) {
            res.status(500).json(err)
        }
    }, 

    //Update a user by Id//
    async updateUser(req,res) {
        console.log("Incoming Params: ", req.params);
        console.log("Incoming Data Body: ", req.body);
        try{
            const user = await User.findOneAndUpdate(
                {_id:req.params.userId},
                {$set: req.body},{
                runValidators: true,
                new: true 
            });
                
            
            if(!user) {
                return res.status(404).json({message: 'No user with that ID!'});
            }
            // res.status(200).json({ message: "User Updated"});
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createFriend(req, res) {
        // capture the incoming data
        // --> userId
        // --> friendId

        // What happens first(?) --> what data are we requesting/updating(?)
        // we need to Query for a USER first (based on the req.params.userId)
        try {
            let currentUser = await User.findOneAndUpdate(
                { _id: req.params.userId}, 
                { $addToSet: { friends: req.params.friendId}}, 
                { new: true }
                )
            if (!currentUser) {
                return res.status(404).json({message:'No user with that id!'});
            }
            res.status(200).json();
        } catch(err) {
            res.status(500).json(err)
        }
    },
    async deleteFriend(req, res) {
        // route Logic

    },
}


module.exports = userController;