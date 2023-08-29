const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userController');

router.route('/')
    .get(getUsers)
    .post(createUser);
//  the above is fancy one-liner for the below code
//router.get('/', getUsers);
//router.post('/', createUser)

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;