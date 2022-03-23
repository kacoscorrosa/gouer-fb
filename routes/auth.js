const { Router } = require('express');

const { validate } = require('../controllers/auth');
const { validateToken } = require('../middlewares/validate-token');

const router = Router();

router.get('/validate', validateToken, validate );

module.exports = router;