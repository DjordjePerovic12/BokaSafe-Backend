const express = require('express');
const router = express.Router();
const marineProtectedAreasController = require('../../controllers/marineProtecedAreasController');
const { route } = require('../root');
const upload = require('../../middleware/upload')



router.route('/')
    .get(marineProtectedAreasController.getAllMarineProtectedAreas)

module.exports = router;