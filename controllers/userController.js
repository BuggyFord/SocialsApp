import User from '../models';

// all of the DATABASE interaction/logic code to INTERACT WITH USERS in the database (goes here)

module.exports = {
    async getUsers(req, res) {
        try{
            const users = await User.find();
        }
    },
}


module.exports = userController