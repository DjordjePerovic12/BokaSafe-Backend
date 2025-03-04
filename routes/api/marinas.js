const express = require('express');
const router = express.Router();
const marinasController = require('../../controllers/marinasController');
const { route } = require('../root');
const upload = require('../../middleware/upload')



router.route('/')
    .get(marinasController.getAllMarinas)

module.exports = router;