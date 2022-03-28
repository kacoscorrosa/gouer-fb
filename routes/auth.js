const { Router } = require('express');

const { me } = require('../controllers/auth');
const { validateToken } = require('../middlewares/validate-token');

const router = Router();

router.get('/me', validateToken, me );

module.exports = router;