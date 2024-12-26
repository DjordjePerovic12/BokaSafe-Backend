const Document = require('../model/Document');
const multer = require('multer');
const path = require('path');


const getAllDocuments = async(req, res) => {
    const documents = await Document.find();
    if(!documents) return res.status(204).json({'message' : 'No documents found'});
    res.json(documents);
};

const uploadDocument = async(req, res) => {
    // Multer will add the file to req.file, so check if it exists.
    if (!req.file) {
        return res.status(400).json({ message: 'File is required' });
    }

    try {
        // Create a document record with the file UR
        // uploaL
        const result = await Document.create({
            url: `/uploads/${req.file.filename}`  // URL relative to your static folder
        });

        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error uploading document' });
    }
};


const getDocumentByID = async (req, res) => {
    if(!req?.params.id) {
        return res.status(400).json({'message' : 'ID parameter is required'})
    }
   const document = await Document.findOne({
        id: req.params.id
   });
    if(!document) {
        res.status(204).json({'message' : 'Document does not exist'});
    }
    res.json(document);
}


const deleteDocument = async (req, res) => {
    // Check if the ID is provided in the request body
    if (!req.body.id) {
        return res.status(400).json({ message: 'ID parameter is required!' });
    }

    // Find the document by ID
    const document = await Document.findOne({
        id: req.body.id
    });

    // If document not found, send a 204 status with a message
    if (!document) {
        return res.status(204).json({ message: 'Document not found' });
    }

    // Delete the document
    const result = await document.deleteOne({
        id: req.body.id
    });

    // Return the result of the deletion
    res.json(result);
};



module.exports = { getAllDocuments, getDocumentByID, deleteDocument, uploadDocument }