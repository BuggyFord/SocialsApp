const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addThought,
    removeThought,
   // addComment,
    //removeComment,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
/*  the above is fancy one-liner for the below code
router.get('/', getUsers);
router.post('/', createUser)
*/
router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/thoughts')/post(addThought);

router.route('/:userId/thoughts/thoughtsId').delete(removeThought);

module.exports = router;