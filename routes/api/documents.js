const express = require('express');
const router = express.Router();
const documentsController = require('../../controllers/documentsController');
const { route } = require('../root');
const upload = require('../../middleware/upload')



router.route('/')
    .get(documentsController.getAllDocuments)
    .post(upload, documentsController.uploadDocument)
    .delete(documentsController.deleteDocument);

router.route('/:id')
    .get(documentsController.getDocumentByID);

module.exports = router;