const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');


router.use('/users', userRoutes);
router.use('/Thought', thoughtsRoutes);

module.exports = router;