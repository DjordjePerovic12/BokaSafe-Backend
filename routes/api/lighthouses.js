const express = require('express');
const router = express.Router();
const lighthousesController = require('../../controllers/lighthousesController');

router.get('/', lighthousesController.getAllLighthouses);

module.exports = router;