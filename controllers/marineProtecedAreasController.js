const MarineProtectedArea = require('../model/MarineProtectedArea');
const multer = require('multer');
const path = require('path');


const getAllMarineProtectedAreas = async(req, res) => {
    const marineProtectedAreas = await MarineProtectedArea.find();
    if(!marineProtectedAreas) return res.status(204).json({'message' : 'No marine Protecte dAreas found'});
    res.json(marineProtectedAreas);
};

module.exports = { getAllMarineProtectedAreas }