const Document = require('../model/Document');

const getAllDocuments = async (req, res) => {
    const documents = await Document.find();
    if (!documents) return res.status(204).json({ message: 'No documents found' });
    res.json(documents);
};

const getDocumentByID = async (req, res) => {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ message: 'Document not found.' });
    res.json(document);
};

const deleteDocument = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Document ID is required.' });
    }

    try {
        const document = await Document.findById(id);
        
        if (!document) {
            return res.status(404).json({ message: 'Document not found.' });
        }

        await Document.deleteOne({ _id: id });
        res.json({ message: 'Document deleted successfully.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error during deletion.' });
    }
};


const uploadDocument = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File upload required.' });
    }

    try {
        const document = await Document.create({
            name: req.file.originalname,
            url: `/uploads/${req.file.filename}`,
        });
        res.status(201).json(document);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving document.' });
    }
};

module.exports = {
    getAllDocuments,
    getDocumentByID,
    deleteDocument,
    uploadDocument,
};
