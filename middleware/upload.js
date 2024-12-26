const multer = require('multer');
const path = require('path');

// Define storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Filename: timestamp + extension
    },
});

// Initialize multer with storage configuration and export it
const upload = multer({ storage: storage }).single('file');  // 'file' is the name of the form field

// Export the upload middleware for use in other files
module.exports = upload;
