const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');
//Get all, Post 
router.route('/')
.get(getThoughts)
.post(createThought)
// Get single, Delete single, Put-update single
router.route('/:userId/thoughts').get(getSingleThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions/reactionId').post(createReaction).delete(deleteReaction);

module.exports = router;