const express = require('express');
const router = express.Router();


const { listPersonalId } = require('./controller');

router.get('/', listPersonalId);

module.exports = router;