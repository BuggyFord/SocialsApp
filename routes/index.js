const router = require('expresss').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res ) =
    res.send('Wrong Route'));

    module.exports = router;