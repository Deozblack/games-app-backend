const { Router } = require('express');
const { getHistories } = require('../controllers/histories.controller');
const router = Router();

router.get('/', getHistories )

module.exports = router;