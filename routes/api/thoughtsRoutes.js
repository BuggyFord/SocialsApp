const router = require('express').Router();
const { 
    getThought,
    createThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getThought).post(createThoughts);

router.route('/:thoughtsId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtsId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;