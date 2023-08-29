const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');


router.use('/users', userRoutes);
router.use('/thought', thoughtsRoutes);

module.exports = router;