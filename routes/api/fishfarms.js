const express = require('express');
const router = express.Router();
const fishFarmsController = require('../../controllers/fishFarmsController');
const { route } = require('../root');
const upload = require('../../middleware/upload')



router.route('/')
    .get(fishFarmsController.getAllFishFarms)

module.exports = router;