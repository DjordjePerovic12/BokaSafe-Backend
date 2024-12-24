const express = require('express');
const router = express.Router();
const lighthousesController = require('../../controllers/lighthousesController');
const { route } = require('../root');

router.route('/')
    .get(lighthousesController.getAllLighthouses)
    .put(lighthousesController.editLighthouse);

router.route('/:id')
    .get(lighthousesController.getLighthouseById);

module.exports = router;