const express = require('express');
const router = express.Router();

const { listBusdaten} = require('./controller');

router.get('/', listBusdaten);

module.exports = router;